//====================================
// INÍCIO: FUNÇÕES DE NAVEGAÇÃO E UX
//====================================

// Função para abrir e fechar o menu de navegação em telas pequenas
function toggleMenu() {
    document.getElementById("menuLinks").classList.toggle("show");
}

// Evento que fecha o menu ao clicar em um link, melhorando a usabilidade em mobile
document.querySelectorAll(".menu-links a").forEach(link => {
    link.addEventListener("click", () => document.getElementById("menuLinks").classList.remove("show"));
});

// ScrollSpy: Adiciona a classe 'active' ao link do menu
// da seção que está visível na tela, criando um efeito de navegação intuitivo
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 120; // O '120' é um ajuste para o menu fixo
        const height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
            current = sec.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

//====================================
// INÍCIO: LÓGICA DO MODAL DE CONTATO
//====================================

// Variável global para armazenar o serviço selecionado
let selectedService = "";

// Função para abrir o modal e preencher com os dados do serviço
function openModal(title, desc, price) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modal-title").innerText = title;
    document.getElementById("modal-desc").innerText = desc;
    document.getElementById("modal-price").innerText = "R$ " + price;
    selectedService = title;
}

// Função para fechar o modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
}

// Evento de submissão do formulário para enviar mensagem via WhatsApp
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Impede o envio padrão do formulário
    
    // Captura os dados dos campos do formulário
    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;

    // Constrói a mensagem a ser enviada
    let msg = `Olá, meu nome é ${nome}. Tenho interesse no serviço: ${selectedService}. Email: ${email} Telefone: ${telefone}`;
    
    // Codifica a mensagem para a URL e abre o WhatsApp em uma nova aba
    let url = `https://wa.me/5534992038802?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");

    closeModal(); // Fecha o modal após o envio
});

//====================================
// INÍCIO: ANIMAÇÃO DE ELEMENTOS NA TELA
//====================================

// Intersection Observer API para animar os cards quando eles entram na área visível
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2 // A animação é ativada quando 20% do card está visível
});

// Observa todos os elementos com a classe '.card'
document.querySelectorAll(".card").forEach(card => observer.observe(card));