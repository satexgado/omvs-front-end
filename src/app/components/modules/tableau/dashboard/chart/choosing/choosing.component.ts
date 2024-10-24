import { ValeurEnum, ChartType } from './../../../../chart-enumeration';
import { QualiteEnum } from 'src/app/components/modules/chart-enumeration';
import { DashboardService } from './../../dashboard.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ChartFormData } from 'src/app/components/modules/chart-interface';


@Component({
  selector: 'app-choosing',
  templateUrl: './choosing.component.html',
  styleUrls: ['./choosing.component.css']
})
export class ChoosingComponent implements OnInit {

  qualiteEnum = QualiteEnum;
  qualiteSelect = [
    {id: QualiteEnum.mois, libelle: 'Mois'},
    {id: QualiteEnum.annee, libelle: 'Année'},
    // {id: QualiteEnum.imputation, libelle: 'Imputation'},
    {id: QualiteEnum.departement, libelle: 'Departement'},
    // {id: QualiteEnum.personne, libelle: 'Personne'},
    // {id: QualiteEnum.poste, libelle: 'Poste'},
    {id: QualiteEnum.localite, libelle: 'Localité'},
    {id: QualiteEnum.pays, libelle: 'Pays'},
    // {id: QualiteEnum.role, libelle: 'Rôle'},
  ];

  valeurEnum = ValeurEnum;

  valeurSelect = [
    {id: ValeurEnum.nbmission, libelle: 'Nombre de mission'},
    {id: ValeurEnum.budget, libelle: 'Budget'},
    {id: ValeurEnum.note, libelle: 'Moyenne des Notes'},
    // {id: ValeurEnum.nbrapportFinal, libelle: 'Nombre de rapport final'},
    // {id: ValeurEnum.nbRapportQuotidient, libelle: 'Nombre de rapport quotidient'},
    // {id: ValeurEnum.nbpersonnel, libelle: 'Nombre de personnes'},
  ];

  chartSelectItems = [
    {id: ChartType.bar, libelle: '', icon_class: "fas fa-chart-bar fa-lg m-2"},
    {id: ChartType.line, libelle: '', icon_class: "fas fa-chart-line fa-lg m-2"},
    {id: ChartType.scatter, libelle: '', icon_class: "fas fa-chart-scatter fa-lg m-2"},
  ];

  configForm: FormGroup;
  chartType = ChartType;
  @Output() chartSelect: EventEmitter<any> = new EventEmitter();

  constructor(private formbuilder: FormBuilder, private service: DashboardService) { }
  
  ngOnInit() {
    const formData = this.service.chartFormData; 
    if(formData) {
      this.setFormData(formData);
    } else {
      this.createForm();
    }
  }

  createForm() {
    this.configForm = this.formbuilder.group({
      valeur: new FormControl(ValeurEnum.nbmission,Validators.required),
      qualite: new FormControl(QualiteEnum.annee,Validators.required),
      chartType: new FormControl(ChartType.bar,Validators.required),
      datasets: this.formbuilder.array([this.createDatasetsArray()])
    })
  }

  setFormData(formData: ChartFormData) {
    
    const datasetFormArray = this.formbuilder.array(formData.datasets.map(dataset => {
        

        const filtersGrp = this.formbuilder.array(dataset.filters.map(filter => {
          const filterGrp = this.formbuilder.group({
            type: [filter.type, Validators.required],
            value: [filter.value, Validators.required]
          });
          return filterGrp;
        }));

        const datasetGrp = this.formbuilder.group({
          libelle: new FormControl(dataset.libelle),
          couleur: new FormControl(dataset.couleur,Validators.required),
          chartType: new FormControl(dataset.chartType,Validators.required),
          filters: filtersGrp
        });

        return datasetGrp ;
    }));

    this.configForm = this.formbuilder.group({
      valeur: new FormControl(formData.valeur,Validators.required),
      qualite: new FormControl(formData.qualite,Validators.required),
      chartType: new FormControl(formData.chartType,Validators.required),
      datasets: datasetFormArray
    });

  }

  createDatasetsArray() {
    return this.formbuilder.group({
      libelle: null,
      couleur: ['#244ec9', Validators.required],
      chartType: [ChartType.bar, Validators.required],
      filters: new FormArray([])
    });
  }

  createFilterArray() {
    return this.formbuilder.group({
      type: ['type_id', Validators.required],
      value: [null, Validators.required]
    })
  }

  getDatasets(form) {
    return form.controls.datasets.controls;
  }

  getFilters(form) {
    return form.controls.filters.controls;
  }

  addDataset() {
    const datasetsControl = this.configForm.get('datasets') as FormArray;
    datasetsControl.push(this.createDatasetsArray());
  }

  removeDataset(index: number) {
    const datasetsControl = <FormArray>this.configForm.get('datasets');
    datasetsControl.removeAt(index);
  }

  addFilter(i) {
    const datasetsControl = this.configForm.get('datasets') as FormArray;
    const filtersControl = datasetsControl.at(i).get('filters') as FormArray;
    filtersControl.push(this.createFilterArray());
  }

  removeFilter(form, filtersIndex: number) {
    form.get('filters').removeAt(filtersIndex);
  }

  shouldDisableSubmit()
  {
    return  this.configForm.invalid;
  }

  onChartSelected() {
    this.service.chartFormData  = this.configForm.value;
    this.chartSelect.emit(this.configForm.value);
  }
}
