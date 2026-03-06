from huggingface_hub import HfApi


# Para subir um arquivo na dataset
api = HfApi()

api.upload_file(
     path_or_fileobj="./base_de_dados/DENGBR25.json", # PATH DO ARQUIVO LOCAL
    path_in_repo="dengue2025.json", # NOME DO ARQUIVO NA DATASET
    repo_id="Projeto-integrador-5/bases_pi_5",
    repo_type="dataset"
)