// Dados iniciais de exemplo
let alunos = [
    {
        id: 1,
        nome: "João Silva",
        email: "joao.silva@escola.com",
        dataNascimento: "2010-05-15",
        serie: "5º Ano",
        observacoes: "Ótimo desempenho em matemática."
    },
    {
        id: 2,
        nome: "Maria Oliveira",
        email: "maria.oliveira@escola.com",
        dataNascimento: "2011-08-22",
        serie: "4º Ano",
        observacoes: "Participa ativamente das aulas de artes."
    },
    {
        id: 3,
        nome: "Carlos Pereira",
        email: "carlos.pereira@escola.com",
        dataNascimento: "2012-03-10",
        serie: "3º Ano",
        observacoes: "Necessita de reforço em português."
    }
];

// Elementos do DOM
const alunosContainer = document.getElementById('alunosContainer');
const addAlunoBtn = document.getElementById('addAlunoBtn');
const alunoModal = document.getElementById('alunoModal');
const alunoForm = document.getElementById('alunoForm');
const modalTitle = document.getElementById('modalTitle');
const cancelBtn = document.getElementById('cancelBtn');
const searchInput = document.getElementById('searchInput');
const alunoIdInput = document.getElementById('alunoId');

// Variáveis de estado
let editingAlunoId = null;

// Função para renderizar os alunos
function renderAlunos(alunosToRender = alunos) {
    alunosContainer.innerHTML = '';
    
    if (alunosToRender.length === 0) {
        alunosContainer.innerHTML = '<p class="text-center">Nenhum aluno encontrado.</p>';
        return;
    }
    
    alunosToRender.forEach(aluno => {
        const alunoCard = document.createElement('div');
        alunoCard.className = 'aluno-card';
        
        const dataNascimento = new Date(aluno.dataNascimento);
        const dataFormatada = dataNascimento.toLocaleDateString('pt-BR');
        
        alunoCard.innerHTML = `
            <h3>${aluno.nome}</h3>
            <span class="serie">${aluno.serie}</span>
            <p><strong>E-mail:</strong> ${aluno.email}</p>
            <p><strong>Nascimento:</strong> ${dataFormatada}</p>
            ${aluno.observacoes ? `<p><strong>Observações:</strong> ${aluno.observacoes}</p>` : ''}
            
            <div class="aluno-actions">
                <button class="btn btn-success edit-btn" data-id="${aluno.id}">Editar</button>
                <button class="btn btn-danger delete-btn" data-id="${aluno.id}">Excluir</button>
            </div>
        `;
        
        alunosContainer.appendChild(alunoCard);
    });
    
    // Adiciona eventos aos botões de edição e exclusão
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', handleEditAluno);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', handleDeleteAluno);
    });
}

// Função para abrir o modal
function openModal() {
    alunoModal.classList.add('active');
}

// Função para fechar o modal
function closeModal() {
    alunoModal.classList.remove('active');
    alunoForm.reset();
    editingAlunoId = null;
}

// Função para adicionar um novo aluno
function addAluno(alunoData) {
    const newId = alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1;
    const newAluno = { id: newId, ...alunoData };
    alunos.push(newAluno);
    renderAlunos();
}

// Função para editar um aluno existente
function editAluno(id, alunoData) {
    const index = alunos.findIndex(a => a.id === id);
    if (index !== -1) {
        alunos[index] = { id, ...alunoData };
        renderAlunos();
    }
}

// Função para excluir um aluno
function deleteAluno(id) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        alunos = alunos.filter(a => a.id !== id);
        renderAlunos();
    }
}

// Função para buscar alunos
function searchAlunos(term) {
    const termLower = term.toLowerCase();
    const filtered = alunos.filter(aluno => 
        aluno.nome.toLowerCase().includes(termLower) || 
        aluno.email.toLowerCase().includes(termLower) ||
        aluno.serie.toLowerCase().includes(termLower)
    );
    renderAlunos(filtered);
}

// Manipuladores de eventos
function handleAddAlunoClick() {
    modalTitle.textContent = 'Adicionar Novo Aluno';
    alunoIdInput.value = '';
    openModal();
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const alunoData = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        dataNascimento: document.getElementById('dataNascimento').value,
        serie: document.getElementById('serie').value,
        observacoes: document.getElementById('observacoes').value
    };
    
    if (editingAlunoId) {
        editAluno(editingAlunoId, alunoData);
    } else {
        addAluno(alunoData);
    }
    
    closeModal();
}

function handleEditAluno(e) {
    const id = parseInt(e.target.dataset.id);
    const aluno = alunos.find(a => a.id === id);
    
    if (aluno) {
        editingAlunoId = id;
        modalTitle.textContent = 'Editar Aluno';
        alunoIdInput.value = id;
        
        // Preenche o formulário com os dados do aluno
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('email').value = aluno.email;
        document.getElementById('dataNascimento').value = aluno.dataNascimento;
        document.getElementById('serie').value = aluno.serie;
        document.getElementById('observacoes').value = aluno.observacoes || '';
        
        openModal();
    }
}

function handleDeleteAluno(e) {
    const id = parseInt(e.target.dataset.id);
    deleteAluno(id);
}

function handleSearchInput(e) {
    searchAlunos(e.target.value);
}

//Função resposta da IA
async function sendMessage() {
    const input = document.getElementById('userInput').value
    const responseDiv = document.getElementById('response')
    if (!input) {
        responseDiv.innerHTML = 'Por favor preencha a transcrição do aluno.'
        return
    }
    responseDiv.innerHTML = 'Criando plano...'
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer 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",
                "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
                "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "deepseek/deepseek-r1-zero:free",
                "messages": [{
                    "role": "user",
                    "content": input
                }]
            })
    });
    const data = await response.json()
    console.log(data)
        data.choices?.[0]?.message?.content || 'Nenhuma resposta recebida'
        responseDiv.innerHTML = marked.parse(markdownText)
    } catch (error) {
    responseDiv.innerHTML = 'Error:' + error.message
    }
}

// Event Listeners
addAlunoBtn.addEventListener('click', handleAddAlunoClick);
alunoForm.addEventListener('submit', handleFormSubmit);
cancelBtn.addEventListener('click', closeModal);
searchInput.addEventListener('input', handleSearchInput);

// Fechar modal ao clicar fora do conteúdo
alunoModal.addEventListener('click', (e) => {
    if (e.target === alunoModal) {
        closeModal();
    }
});

// Inicializa a aplicação
document.addEventListener('DOMContentLoaded', () => {
    renderAlunos();
    sendMessage()
})
