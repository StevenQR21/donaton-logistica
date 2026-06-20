import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

// 1. Apagamos la sincronización real con Neon
vi.mock('../config/db', () => {
  const mockDB = {
    sync: vi.fn().mockResolvedValue(true),
    define: vi.fn().mockReturnValue({})
  };
  return { default: mockDB, ...mockDB };
});

// 2. Importamos el repositorio y la app en el MISMO universo de Node
const logisticaRepository = require('../repositories/LogisticaRepository');
const app = require('../app');

describe('Microservicio - API de Logística', () => {

  beforeEach(() => {
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  /* --- RUTAS FELICES --- */

  it('GET /health - Debe confirmar que el servicio está vivo', async () => {
    const response = await request(app).get('/health');
    
    // app.js devuelve: { status: 'success', message: '...' }
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('success');
  });

  it('GET / - Debe devolver el inventario', async () => {
    // Espiamos el nombre REAL de tu función en LogisticaRepository.js
    vi.spyOn(logisticaRepository, 'obtenerInventario').mockResolvedValue([
      { id: 1, item: 'Mantas', cantidad: 100 }
    ]);

    const response = await request(app).get('/');

    
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0].item).toBe('Mantas');
  });

  it('POST / - Debe registrar una entrada exitosamente', async () => {
    
    vi.spyOn(logisticaRepository, 'registrarEntrada').mockResolvedValue({ 
      id: 2, item: 'Cajas de Alimento', cantidad: 50 
    });

    const response = await request(app)
      .post('/')
      .send({ item: 'Cajas de Alimento', cantidad: 50, centro_acopio: 'Bodega Central' });

    
    expect(response.status).toBe(201);
    expect(response.body.item).toBe('Cajas de Alimento');
  });

  /* --- RUTAS TRISTES --- */

  it('GET / - Debe atrapar errores internos', async () => {
    vi.spyOn(logisticaRepository, 'obtenerInventario').mockRejectedValue(new Error('Caída de BD'));

    const response = await request(app).get('/');
    
    
    expect(response.status).toBe(500);
    expect(response.body.error).toBe('Caída de BD');
  });

  it('POST / - Debe rechazar si hay un error al registrar', async () => {
    vi.spyOn(logisticaRepository, 'registrarEntrada').mockRejectedValue(new Error('Faltan datos'));

    const response = await request(app).post('/').send({});
    
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Faltan datos');
  });

});