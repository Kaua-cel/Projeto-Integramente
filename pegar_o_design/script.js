// Banco de dados simulado
let alunos = [
    {
        id: 1,
        nome: "João Silva",
        email: "joao@escola.com",
        idade: 15,
        serie: "1º Ano",
        observacoes: "Ótimo desempenho em matemática"
    },
    {
        id: 2,
        nome: "Maria Oliveira",
        email: "maria@escola.com",
        idade: 16,
        serie: "2º Ano",
        observacoes: "Participa do clube de ciências"
    }
];

// Elementos DOM
const alunosContainer = document.getElementById('alunosContainer');
const searchInput = document.getElementById('searchInput');
const addAlunoBtn = document.getElementById('addAlunoBtn');
const alunoModal = document.getElementById('alunoModal');
const confirmModal = document.getElementById('confirmModal');
const alunoForm = document.getElementById('alunoForm');
const modalTitle = document.getElementById('modalTitle');
const alunoIdInput = document.getElementById('alunoId');
const cancelBtn = document.getElementById('cancelBtn');
const confirmCancelBtn = document.getElementById('confirmCancelBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');

// Variáveis de estado
let currentAlunoId = null;
let isEditMode = false;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderAlunos(alunos);
    
    // Event Listeners
    addAlunoBtn.addEventListener('click', openAddModal);
    cancelBtn.addEventListener('click', closeModal);
    confirmCancelBtn.addEventListener('click', closeConfirmModal);
    alunoForm.addEventListener('submit', handleFormSubmit);
    searchInput.addEventListener('input', handleSearch);
});

// Funções
function renderAlunos(alunosToRender) {
    alunosContainer.innerHTML = '';
    
    if (alunosToRender.length === 0) {
        alunosContainer.innerHTML = '<p class="text-center">Nenhum aluno encontrado</p>';
        return;
    }
    
    alunosToRender.forEach(aluno => {
        const alunoCard = document.createElement('div');
        alunoCard.className = 'aluno-card';
        alunoCard.innerHTML = `
            <span class="serie">${aluno.serie}</span>
            <h3>${aluno.nome}</h3>
            <p><i class="fas fa-envelope"></i> ${aluno.email}</p>
            <p><i class="fas fa-birthday-cake"></i> ${aluno.idade} anos</p>
            ${aluno.observacoes ? `<p><i class="fas fa-info-circle"></i> ${aluno.observacoes}</p>` : ''}
            <div class="aluno-actions">
                <button class="btn" onclick="editAluno(${aluno.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
                <button class="btn btn-danger" onclick="confirmDelete(${aluno.id})">
                    <i class="fas fa-trash"></i> Excluir
                </button>
            </div>
        `;
        alunosContainer.appendChild(alunoCard);
    });
}

function openAddModal() {
    isEditMode = false;
    modalTitle.textContent = 'Adicionar Novo Aluno';
    alunoForm.reset();
    alunoIdInput.value = '';
    alunoModal.classList.add('active');
}

function openEditModal(aluno) {
    isEditMode = true;
    modalTitle.textContent = 'Editar Aluno';
    alunoIdInput.value = aluno.id;
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('email').value = aluno.email;
    document.getElementById('idade').value = aluno.idade;
    document.getElementById('serie').value = aluno.serie;
    document.getElementById('observacoes').value = aluno.observacoes || '';
    alunoModal.classList.add('active');
}

function closeModal() {
    alunoModal.classList.remove('active');
}

function closeConfirmModal() {
    confirmModal.classList.remove('active');
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const alunoData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        idade: parseInt(document.getElementById('idade').value),
        serie: document.getElementById('serie').value,
        observacoes: document.getElementById('observacoes').value
    };
    
    if (isEditMode) {
        // Atualizar aluno existente
        const id = parseInt(alunoIdInput.value);
        const alunoIndex = alunos.findIndex(a => a.id === id);
        if (alunoIndex !== -1) {
            alunos[alunoIndex] = { ...alunos[alunoIndex], ...alunoData };
        }
    } else {
        // Adicionar novo aluno
        const newId = alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1;
        alunos.push({ id: newId, ...alunoData });
    }
    
    renderAlunos(alunos);
    closeModal();
}

function editAluno(id) {
    const aluno = alunos.find(a => a.id === id);
    if (aluno) {
        openEditModal(aluno);
    }
}

function confirmDelete(id) {
    currentAlunoId = id;
    const aluno = alunos.find(a => a.id === id);
    if (aluno) {
        document.getElementById('confirmMessage').textContent = 
            `Tem certeza que deseja excluir o aluno ${aluno.nome}?`;
        confirmModal.classList.add('active');
    }
}

// Event listener para o botão de exclusão
confirmDeleteBtn.addEventListener('click', () => {
    if (currentAlunoId) {
        alunos = alunos.filter(a => a.id !== currentAlunoId);
        renderAlunos(alunos);
        closeConfirmModal();
        currentAlunoId = null;
    }
});

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredAlunos = alunos.filter(aluno => 
        aluno.nome.toLowerCase().includes(searchTerm) ||
        aluno.email.toLowerCase().includes(searchTerm) ||
        aluno.serie.toLowerCase().includes(searchTerm)
    );
    renderAlunos(filteredAlunos);
}

// Funções globais para serem chamadas do HTML
window.editAluno = editAluno;
window.confirmDelete = confirmDelete;