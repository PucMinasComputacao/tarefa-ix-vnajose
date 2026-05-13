const data = {
  produtos: [
    { id: 1, nome: "iPhone 13", preco: 5000, categoria: "Celulares", imagem: "https://picsum.photos/200/150?random=1", descricao: "Apple iPhone 13", emEstoque: true },
    { id: 2, nome: "Galaxy S21", preco: 4000, categoria: "Celulares", imagem: "https://picsum.photos/200/150?random=2", descricao: "Samsung Galaxy", emEstoque: true },
    { id: 3, nome: "Notebook Dell", preco: 3500, categoria: "Notebooks", imagem: "https://picsum.photos/200/150?random=3", descricao: "Notebook potente", emEstoque: false },
    { id: 4, nome: "Mouse Gamer", preco: 150, categoria: "Acessórios", imagem: "https://picsum.photos/200/150?random=4", descricao: "Mouse RGB", emEstoque: true },
    { id: 5, nome: "Teclado Mecânico", preco: 300, categoria: "Acessórios", imagem: "https://picsum.photos/200/150?random=5", descricao: "Teclado top", emEstoque: true },
    { id: 6, nome: "PlayStation 5", preco: 4500, categoria: "Games", imagem: "https://picsum.photos/200/150?random=6", descricao: "Console Sony", emEstoque: false },
    { id: 7, nome: "Xbox Series X", preco: 4200, categoria: "Games", imagem: "https://picsum.photos/200/150?random=7", descricao: "Console Microsoft", emEstoque: true },
    { id: 8, nome: "MacBook Air", preco: 7000, categoria: "Notebooks", imagem: "https://picsum.photos/200/150?random=8", descricao: "Notebook Apple", emEstoque: true }
  ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.querySelector("#btnRender");


function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  const card = document.createElement("div");
  card.setAttribute("data-id", produto.id);
  card.classList.add("card");

  card.style.backgroundColor = "#f9f9f9";

  const title = document.createElement("h3");
  title.textContent = produto.nome;

  const img = document.createElement("img");
  img.setAttribute("src", produto.imagem);

  const price = document.createElement("p");
  price.textContent = formatPrice(produto.preco);

  const category = document.createElement("p");
  category.textContent = produto.categoria;

  const btnDetails = document.createElement("button");
  btnDetails.textContent = "Ver detalhes";

  btnDetails.addEventListener("click", () => {
    showProductDetails(produto);
  });

  const btnHighlight = document.createElement("button");
  btnHighlight.textContent = "Destacar";

  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(price);
  card.appendChild(category);
  card.appendChild(btnDetails);
  card.appendChild(btnHighlight);

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    console.log("Card ID:", card.getAttribute("data-id"));
  });
}

function renderCategories() {
  const categorias = ["Todas"];

  data.produtos.forEach(p => {
    if (!categorias.includes(p.categoria)) {
      categorias.push(p.categoria);
    }
  });

  categorySelect.innerHTML = "";

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p><strong>Preço:</strong> ${formatPrice(produto.preco)}</p>
    <p><strong>Categoria:</strong> ${produto.categoria}</p>
    <p><strong>Estoque:</strong> ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
  `;
}

function filterProducts() {
  const texto = searchInput.value.toLowerCase();
  const categoria = categorySelect.value;

  return data.produtos.filter(p => {
    const matchNome = p.nome.toLowerCase().includes(texto);
    const matchCategoria = categoria === "Todas" || p.categoria === categoria;

    return matchNome && matchCategoria;
  });
}


searchInput.addEventListener("input", () => {
  renderProducts(filterProducts());
});

categorySelect.addEventListener("change", () => {
  renderProducts(filterProducts());
});

btnRender.addEventListener("click", () => {
  renderProducts(filterProducts());
});

renderCategories();
renderProducts(data.produtos);