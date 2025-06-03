from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from django.shortcuts import render, get_object_or_404, redirect
from .models import Aluno

@login_required
def index(request):
    alunos = (
        Aluno.objects
            .filter(professor=request.user.professor)
            .order_by('prioridade','nome')
    )
    return render(request,'minhaapp/index.html', {'alunos': alunos})

@login_required
def visualizar_fila(request):
    alunos = (
        Aluno.objects
            .filter(professor=request.user.professor)
            .order_by('prioridade','nome')
    )
    return render(request, 'minhaapp/fila.html',{'alunos':alunos})

@login_required
def registrar_atendimento(request,aluno_id):
    aluno = get_object_or_404(
        Aluno, id=aluno_id, professor=request.user.professor
    )
    aluno.delete()
    return redirect('visualizar_fila')

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request,user)
            return redirect('index')
        else:
            messages.error(request,'Usuário ou senha inválidos')
    else:
        form = AuthenticationForm()
    return render(request, 'minhaapp/login.html', {'form':form})

def logout_view(request):
    logout(request)
    return redirect('login')    
