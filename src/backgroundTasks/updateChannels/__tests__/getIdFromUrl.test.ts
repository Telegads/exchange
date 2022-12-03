import { getIdFromUrl } from '../getIdFromUrl';

describe('first', () => {
  it('should return id string', () => {
    const url = 'https://t.me/Shayx_MuhammadSodiq_Muxlislari';

    const id = getIdFromUrl(url);

    expect(id).toBe('Shayx_MuhammadSodiq_Muxlislari');
  });
});
