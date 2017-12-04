export class UserGrid {
    result: User[];

    constructor(item?: any) {
        this.result = item && item.result && Array.isArray(item.result)
            ? item.result.map(x => new User(x)): [];
    }
}

export class User{
    id: number;
    nombre: string;
    nivel: string;
    division: string;
    localizacion: string;
    responsable: string;
    rol: IdValue;
    unidadesOrganizativasAsignadas: string;
    unidadesOrganizativasNombre: string;
    unidadesOrganizativasValor: string;
    activo: boolean;
    iniciales: string;

    constructor(item?: any) {
        this.id = item && item.id ? item.id : 0;
        this.nombre = item && item.nombre ? item.nombre : '';
        this.nivel = item && item.nivel ? item.nivel : '';
        this.division = item && item.division ? item.division : '';
        this.localizacion = item && item.localizacion ? item.localizacion : '';
        this.responsable = item && item.responsable ? item.responsable : '';
        this.rol = item && item.rol ? new IdValue(item.rol) : null;
        this.unidadesOrganizativasAsignadas = item && item.unidadesOrganizativasAsignadas ? item.unidadesOrganizativasAsignadas : '';
        this.activo = item && item.activo != null ? item.activo : false;
    }
}

export class IdValue {
    id: number;
    value: string;
    
    constructor(item?: any) {
        this.id = item.id ? item.id : '';
        this.value = item.value ? item.value : '';
    }
}