class DropdownView {
  parentElement = document.getElementById("dropdown");
  data;
  render(data) {
    this.data = data;
    const markup = this.generateMarkup();
    this.parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  generateMarkup() {
    return this.data
      .map((category) => {
        return `
        <option>${category}</option>
        `;
      })
      .join("");
  }
}

export default new DropdownView();
