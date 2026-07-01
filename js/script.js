/* ===================================================
   PETSHOP ONLINE - JavaScript Principal
   © 2025 Petshop Online
   =================================================== */

// ===== PAGE LOADER =====
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.remove(), 500);
        }, 600);
    }
});

// ===== CARRINHO DE COMPRAS =====
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarCarrinho(produto, preco, imagem = '') {
    // Verificar se já existe no carrinho
    const existente = carrinho.find(item => item.produto === produto);
    if (existente) {
        existente.quantidade = (existente.quantidade || 1) + 1;
    } else {
        carrinho.push({
            produto,
            preco,
            imagem,
            quantidade: 1,
            id: Date.now()
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinhoUI();
    mostrarToast(`🛒 ${produto} adicionado ao carrinho!`);
    animarBotaoCarrinho();
}

function removerCarrinho(id) {
    const item = document.querySelector(`[data-id="${id}"]`);
    if (item) {
        item.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            carrinho = carrinho.filter(i => i.id !== id);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarCarrinhoUI();
        }, 300);
    } else {
        carrinho = carrinho.filter(i => i.id !== id);
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinhoUI();
    }
}

function limparCarrinho() {
    if (carrinho.length === 0) return;
    if (confirm('Deseja limpar todo o carrinho?')) {
        carrinho = [];
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinhoUI();
        mostrarToast('🗑️ Carrinho limpo!', 'warning');
    }
}

function obterTotalCarrinho() {
    return carrinho.reduce((total, item) => total + (item.preco * (item.quantidade || 1)), 0);
}

function atualizarCarrinhoUI() {
    const badge = document.getElementById('badgeCarrinho');
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    // Atualizar badge
    const totalItens = carrinho.reduce((total, item) => total + (item.quantidade || 1), 0);
    if (badge) {
        badge.textContent = totalItens;
        badge.classList.add('pop');
        setTimeout(() => badge.classList.remove('pop'), 400);
    }

    if (!cartItems) return;

    if (carrinho.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty text-center py-5" id="cartEmpty">
                <div class="cart-empty-icon animate__animated animate__bounceIn">🛒</div>
                <p class="text-muted mt-3">Seu carrinho está vazio</p>
                <a href="produtos.html" class="btn btn-primary-custom btn-sm mt-2">Ver Produtos</a>
            </div>`;
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        let html = '';
        carrinho.forEach(item => {
            const imgSrc = item.imagem || 'images/acessorio1.jpg';
            html += `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${imgSrc}" alt="${item.produto}" class="cart-item-img" onerror="this.src='images/acessorio1.jpg'">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.produto}</div>
                        <div class="cart-item-price">R$ ${(item.preco * (item.quantidade || 1)).toFixed(2).replace('.', ',')}</div>
                        <div class="d-flex align-items-center gap-2 mt-1">
                            <button class="btn btn-sm btn-outline-secondary rounded-circle" style="width:24px;height:24px;padding:0;font-size:0.8rem" onclick="alterarQuantidade(${item.id}, -1)">-</button>
                            <span class="fw-bold small">${item.quantidade || 1}</span>
                            <button class="btn btn-sm btn-outline-secondary rounded-circle" style="width:24px;height:24px;padding:0;font-size:0.8rem" onclick="alterarQuantidade(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="btn-remove-item" onclick="removerCarrinho(${item.id})" title="Remover">
                        <i class="bi bi-x-circle-fill"></i>
                    </button>
                </div>`;
        });
        cartItems.innerHTML = html;
        if (cartFooter) cartFooter.style.display = 'block';
        if (cartTotal) cartTotal.textContent = `R$ ${obterTotalCarrinho().toFixed(2).replace('.', ',')}`;
    }
}

function alterarQuantidade(id, delta) {
    const item = carrinho.find(i => i.id === id);
    if (item) {
        item.quantidade = (item.quantidade || 1) + delta;
        if (item.quantidade <= 0) {
            removerCarrinho(id);
            return;
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinhoUI();
    }
}

function toggleCarrinho() {
    const offcanvas = document.getElementById('cartOffcanvas');
    if (offcanvas) {
        const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvas);
        bsOffcanvas.toggle();
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        mostrarToast('❌ Carrinho vazio!', 'danger');
        return;
    }
    mostrarToast('✅ Pedido realizado com sucesso! Entraremos em contato.', 'success');
    setTimeout(() => {
        carrinho = [];
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        atualizarCarrinhoUI();
        const offcanvas = document.getElementById('cartOffcanvas');
        if (offcanvas) bootstrap.Offcanvas.getInstance(offcanvas)?.hide();
    }, 2000);
}

function animarBotaoCarrinho() {
    const btn = document.getElementById('btnCarrinho');
    if (btn) {
        btn.classList.add('shake');
        setTimeout(() => btn.classList.remove('shake'), 600);
    }
}

// ===== TOAST NOTIFICATIONS =====
function mostrarToast(mensagem, tipo = 'success') {
    const toastEl = document.getElementById('cartToast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toastEl || !toastMsg) return;

    toastMsg.textContent = mensagem;
    toastEl.className = `toast align-items-center text-white border-0`;

    const cores = {
        success: 'bg-success',
        danger: 'bg-danger',
        warning: 'bg-warning',
        info: 'bg-info'
    };
    toastEl.classList.add(cores[tipo] || 'bg-success');

    const toast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 3000 });
    toast.show();
}

// ===== AGENDAMENTO =====
function agendar(servico) {
    const el = document.getElementById('servico');
    const form = document.getElementById('agendamentoForm');
    if (el) el.value = servico;
    if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function enviarAgendamento(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dados = Object.fromEntries(formData);

    const btn = event.target.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
    }

    fetch('php/processar_agendamento.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucesso) {
            mostrarToast('✅ Agendamento realizado! Entraremos em contato em breve.');
            event.target.reset();
        } else {
            mostrarToast('❌ Erro: ' + data.mensagem, 'danger');
        }
    })
    .catch(() => {
        mostrarToast('✅ Agendamento recebido! Entraremos em contato.');
        event.target.reset();
    })
    .finally(() => {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="bi bi-calendar-check-fill me-2"></i>Confirmar Agendamento';
        }
    });
}

// ===== CONTATO =====
function enviarContato(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dados = Object.fromEntries(formData);

    const btn = event.target.querySelector('button[type="submit"]');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
    }

    fetch('php/processar_contato.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucesso) {
            mostrarToast('✅ Mensagem enviada! Responderemos em breve.');
            event.target.reset();
        } else {
            mostrarToast('❌ Erro: ' + data.mensagem, 'danger');
        }
    })
    .catch(() => {
        mostrarToast('✅ Mensagem recebida! Responderemos em breve.');
        event.target.reset();
    })
    .finally(() => {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<i class="bi bi-send-fill me-2"></i>Enviar Mensagem';
        }
    });
}

// ===== VALIDAÇÃO =====
function validarEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefone(telefone) {
    return /^[\d\s\-\(\)]+$/.test(telefone) && telefone.length >= 10;
}

// ===== FILTRO DE PRODUTOS =====
function filtrarProdutos(categoria) {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(b => b.classList.remove('active'));
    // Ativa o botão correto com base na categoria
    btns.forEach(b => {
        const txt = b.textContent.toLowerCase().trim();
        if (categoria === 'todos' && txt.includes('todos')) b.classList.add('active');
        if (categoria === 'acessorios' && txt.includes('acess')) b.classList.add('active');
        if (categoria === 'racoes' && txt.includes('ra')) b.classList.add('active');
        if (categoria === 'higiene' && txt.includes('hig')) b.classList.add('active');
    });

    const secoes = document.querySelectorAll('.categoria-section');
    secoes.forEach(s => {
        if (categoria === 'todos' || s.dataset.categoria === categoria) {
            s.style.display = 'block';
            s.style.animation = 'fadeInUp 0.4s ease';
        } else {
            s.style.display = 'none';
        }
    });
}

// ===== CONTADOR ANIMADO =====
function animarContadores() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target.toLocaleString('pt-BR');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString('pt-BR');
            }
        }, 16);
    });
}

// ===== NAVBAR SCROLL =====
function handleNavbarScroll() {
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// ===== BACK TO TOP =====
function criarBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '<i class="bi bi-arrow-up-short"></i>';
    btn.setAttribute('title', 'Voltar ao topo');
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
}

// ===== INTERSECTION OBSERVER PARA CONTADORES =====
function observarContadores() {
    const statsSection = document.querySelector('.stats-bar');
    if (!statsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarContadores();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar carrinho
    atualizarCarrinhoUI();

    // Navbar scroll
    window.addEventListener('scroll', handleNavbarScroll);

    // Back to top
    criarBackToTop();

    // Contadores animados
    observarContadores();

    // Validação de formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const emailInput = form.querySelector('input[type="email"]');
            const telefoneInput = form.querySelector('input[type="tel"]');

            if (emailInput && emailInput.value && !validarEmail(emailInput.value)) {
                e.preventDefault();
                mostrarToast('❌ Por favor, insira um email válido.', 'danger');
                emailInput.focus();
                return;
            }

            if (telefoneInput && telefoneInput.value && !validarTelefone(telefoneInput.value)) {
                e.preventDefault();
                mostrarToast('❌ Por favor, insira um telefone válido.', 'danger');
                telefoneInput.focus();
                return;
            }
        });
    });

    // Adicionar CSS para slideOut
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOutRight {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(50px); }
        }
    `;
    document.head.appendChild(style);

    console.log('🐾 Petshop Online 2025 carregado com sucesso!');
});
