from datasets import load_dataset
from huggingface_hub import list_repo_files
import pandas as pd
class OrganizeData():
    files = list_repo_files(repo_id="Projeto-integrador-5/bases_pi_5", repo_type="dataset")
    csvs = [f for f in files if f.endswith(".csv")]
    datasets = {}
    full_dataset = {}

    def organize(self):
        for file in self.csvs:
            # file_name = file.replace(".csv", "")
            self.datasets[file] = load_dataset(
                "Projeto-integrador-5/bases_pi_5",
                data_files=file
            )


        for nome, ds in self.datasets.items():
            for city in ds["train"]:
                municipio = city["Município"]
                partes = municipio.split()
                nome_cidade = " ".join(partes[1:]) 
                if nome_cidade not in self.full_dataset:
                    self.full_dataset[nome_cidade] = {}
                
                for key, value in city.items():
                    if key != "Município":
                        self.full_dataset[nome_cidade][key] = value

    def find(self, city):
        if(self.full_dataset == {}):
            self.organize()
        print("asdasdasdasdasdasd")
        return self.full_dataset[city]
        

