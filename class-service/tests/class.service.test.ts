describe('Class Service', () => {
    it('should list all classes', async () => {
      const res = await request(app)
        .post('/graphql')
        .send({
          query: `
            query {
              classes {
                id
                name
              }
            }
          `
        });
  
      expect(res.body.data.classes).toBeInstanceOf(Array);
    });
  });
  