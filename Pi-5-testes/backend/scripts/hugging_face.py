from huggingface_hub import HfApi, list_repo_files
import os
import csv
import pandas as pd
import re
from pathlib import Path
# Enviar dados para o repositorio do hugging face
# Ainda está bem desorganizado, precisamos pensar em um padrão de armazenamento (O que? Em que lugar? Etc...)]
# Enviaremos os dados como csv, são mais leves, a IA lê do mesmo jeito, alem de ser facil de manipular com a biblioteca pandas

path = Path("./backend/base_de_dados").resolve()
dir_list = os.listdir(path)
api = HfApi()

# Esse codigo foi feito apenas para 2 arquivos testes, para que eles possam ser corretamente convertidos
# Isso nao significa que vá funcionar para todos, os dois arquivos que eu testei ja estão no repositorio do hugging face
# Arquivos fora desse padrão não funcionarão nessa conversão
# As tabelas do https://datasus.saude.gov.br/informacoes-de-saude-tabnet/ -> Estatísticas vitais estão nesse padrão

def find_last_row(file_path):
    with open(file_path, encoding="latin-1") as f:
        rows = f.readlines()
    
    for i, linha in enumerate(rows):
        if linha.strip().strip('"').startswith("355730"):
            return i
    return None

for file in dir_list:
    file_path = f"{path}/{file}"
    last_row = find_last_row(file_path)

    if last_row is None:
        print(f"Código 355730 não encontrado em {file}")
        continue

    df = pd.read_csv(
        file_path,
        encoding="latin-1",
        sep=";",
        skiprows=3,       
        nrows=last_row - 3,   
        engine="python"    
    )
    df.to_csv(file_path, encoding="utf-8", index=False, sep=",")
    if(file not in list_repo_files(repo_id="Projeto-integrador-5/bases_pi_5", repo_type="dataset")):
        api.upload_file(
            path_or_fileobj=file_path, # PATH DO ARQUIVO LOCAL
            path_in_repo=file, # NOME DO ARQUIVO NA DATASET
            repo_id="Projeto-integrador-5/bases_pi_5",
            repo_type="dataset"
        )