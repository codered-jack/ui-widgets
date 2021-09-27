class ProductView {
  parentElement = document.querySelector(".cards");
  data;
  render(data) {
    this.data = data;
    const markup = this.generateMarkup();
    this.clear();
    if (this.data.length === 0) {
      this.parentElement.insertAdjacentHTML(
        "afterbegin",
        `<div>No Products Available.</div>`
      );
    }
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  clear() {
    this.parentElement.innerHTML = "";
  }

  generateMarkup() {
    return this.data
      .map((product) => {
        return `
        <div class="card">
        <img
          src=${product.image}
          alt="Avatar"
          style="width: 100%"
        />
        <div class="container">
          <h4><b>${product.title}</b></h4>
          <strong>Rs.${product.price}</strong>
          <p>${product.description}</p>
        </div>
      </div>
        `;
      })
      .join("");
  }
}

export default new ProductView();
