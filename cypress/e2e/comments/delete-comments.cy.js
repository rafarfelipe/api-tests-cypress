describe('DELETE /comments', () => {
  it('Remove um Comment', () => {
    cy.request({
      method: 'DELETE',
      url: '/comments/1',
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect(status).to.be.oneOf([200, 204])
    })
  })
})
