document.addEventListener("DOMContentLoaded", () => {
  const breadcrumb = document.querySelector(".breadcrumb");
  if (breadcrumb) {
    breadcrumb.innerHTML = `
			<a href="/index.html">Home</a> <span>/</span> <span aria-current="page">Cart</span>
		`;
  }
});
