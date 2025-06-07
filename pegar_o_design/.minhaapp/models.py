# from django.db import models
# from django.contrib.auth.models import User

# class Professor(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     nome = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)

#     def __str__(self):
#         return self.nome
    
# class Aluno(models.Model):
#     PRIORIDADES_CHOICES = [
#          (1, 'Alta'),
#          (2, 'Média'),
#          (3, 'Baixa'),
#     ]
    
#     nome = models.CharField(max_length=100)
#     idade = models.IntegerField()
#     turma = models.CharField(max_length=50)
#     neurodivergencias = models.ManyToManyField('Neurodivergencia')
#     prioridade = models.IntegerField(default=1)
#     observacoes = models.TextField(blank=True)
#     professor = models.ForeignKey(Professor,on_delete=models.CASCADE)

#     def __str__(self):
#          return self.nome
    
# class Neurodivergencia(models.Model):
#         tipo = models.CharField(max_length=50)

#         def __str__(self):
#             return self.tipo
        
# class Atendimento(models.Model):
#      aluno = models.ForeignKey(Aluno,on_delete=models.CASCADE)
#      professor = models.ForeignKey(Professor,on_delete=models.CASCADE)
#      data = models.DateTimeField(auto_now_add=True)
#      observacoes = models.TextField(blank=True)

#      def __str__(self):
#           return f"{self.aluno.nome} - {self.data.strftime('%d/%m/%Y')}"