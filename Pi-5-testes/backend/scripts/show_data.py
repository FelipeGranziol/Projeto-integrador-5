from datasets import load_dataset
from huggingface_hub import list_repo_files
import pandas as pd
import unicodedata

def normalize(text: str) -> str:
    return unicodedata.normalize("NFD", text) \
        .encode("ascii", "ignore") \
        .decode("utf-8") \
        .upper()

class OrganizeData():
    def __init__(self):
        self.files = list_repo_files(repo_id="Projeto-integrador-5/bases_pi_5", repo_type="dataset")
        self.csvs = [f for f in self.files if f.endswith(".csv")]
        self.single_yerar_datasets = {}
        self.total_datasets ={}
        self.full_dataset = {}

    def organize_total_data(self):
        for nome, ds in self.total_datasets.items():
            for city in ds["train"]:
                municipio = city["Município"]
                partes = municipio.split()
                nome_cidade = normalize(" ".join(partes[1:]))

                if nome_cidade not in self.full_dataset:
                    self.full_dataset[nome_cidade] = {"vital_rates": [], "vital_rates_total": {}}

                if "vital_rates_total" not in self.full_dataset[nome_cidade]:
                    self.full_dataset[nome_cidade]["vital_rates_total"] = {}

                for key, value in city.items():
                    if key != "Município":
                        self.full_dataset[nome_cidade]["vital_rates_total"][key] = value

    def organize(self):
        for file in self.csvs:
            if("obitos_" in file or "nascimentos_" in file):
                self.total_datasets[file] = load_dataset(
                "Projeto-integrador-5/bases_pi_5",
                data_files=file
            )
                continue
            else:
                self.single_yerar_datasets[file] = load_dataset(
                    "Projeto-integrador-5/bases_pi_5",
                    data_files=file
                )

        for nome, ds in self.single_yerar_datasets.items():
                ano = nome.split("_")[-1].replace(".csv", "")

                for city in ds["train"]:
                    municipio = city["Município"]
                    partes = municipio.split()
                    nome_cidade = normalize(" ".join(partes[1:]))

                    if nome_cidade not in self.full_dataset:
                        self.full_dataset[nome_cidade] = {"vital_rates": []}

                    entry = next(
                        (e for e in self.full_dataset[nome_cidade]["vital_rates"] if e["ano"] == ano),
                        None
                    )
                    if entry is None:
                        entry = {"ano": ano}
                        self.full_dataset[nome_cidade]["vital_rates"].append(entry)

                    for key, value in city.items():
                        if key != "Município":
                            entry[key] = value

        self.organize_total_data()
                        
    def find(self, city):
        return self.full_dataset.get(normalize(city))  
        

