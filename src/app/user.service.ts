import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthenticationService } from './auth/auth.service';

export interface User {
  id: number;
  username: string;
  nom?: string;
  email: string;
  roleName: string; // ✅ changed from role
  status: string;
  createdDate: string;

  enabled: boolean;
  accountLocked: boolean;
}

export interface Zone {
  idZone?: number;   // optionnel à la création
  libelle: string;
  gouvernorat: string;

  secteur?: Secteur;
  chefZone?: User;

  regions?: Region[];  // <-- Ajoute cette propriété !
}

export interface Shop {
  idShop?: number;
  nomShop: string;
  telephone: string;
  adminShop?: {
    id: number;
    username?: string;
    email?: string;
  };
    region?: Region;

}


export interface Secteur {
  regions: any;
  idSecteur?: number;  // 👈 optionnel à la création
  nom: string;
  zones?: Zone[];
  chefSecteur?: {
    id: number;
    nom: string;
    prenom: string;
    email?: string;
  };
}




export interface Region {
  idRegion?: number;
  nom: string;
  delegation: string;
  zone?: Zone;
  chefRegion?: User;
  shops?: Shop[];
}

export interface Field {
 
  id?: number;       // Utilisé en interne
  idField?: number;  // Vient du backend
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}


export interface CreateReportRequest {
  titre: string;
  destinataireId: number;
  fields: Field[];
}


export interface ReportFieldValueDTO {
  fieldId: number;
  value: string;
}
export interface ReportField {
  idReportField: number;
  id: number; // ✅ alias temporaire
  label: string;
  type: string;
  required: boolean;
  options?: string[]; 
}

export interface ReportDTO {
  titre: string;
  type: string;
  description: string;
  shopId: number;
  dateCreation?: string;  // <-- ajout facultatif (optionnel)
  fieldValues: ReportFieldValueDTO[];
}




export interface DashboardRegionDTO {
  totalReports: number;
  totalShops: number;
  totalUsers: number;
  // ajoute d’autres propriétés si nécessaire selon ton backend
}
export interface DashboardZoneDTO {
  totalRegions: number;
  totalShops: number;
  totalReports: number;
}

export interface Report {
  id: number;
  title: string;
  description: string;
  // autres champs...
}

export interface ReportFieldCreation {
  label: string;
  type: string;
  required: boolean;
  options: string[];
}

export interface ReportCreationRequest {
  titre: string;
  description: string;
  type: string;
  destinataireId: number;
  shopId: number;
  fieldIds: number[];// ✅ plus de `fieldIds`
}
export interface ReportSummaryDTO {
  id: number;
  titre: string;
  dateCreation?: string;  // si tu as une date
}

export interface ReportWithValuesDTO {
  idReport: number;
  titre: string;
  type: string;
  description: string;
  shopId: number;
  dateCreation?: string;
  fieldValues: ReportFieldValueDTO[];  // all filled fields with their values
  fields: ReportField[];            // list of fields (metadata)
}

export interface DestinataireReportDTO {
  idReport: number;       // report ID
  titre: string;         // report title
  description: string;       // report content/description
  type: string;          // report type
  vu: boolean;           // if read or not
  dateCreation: string;  // creation date
  nomShop: string;       // shop name related
  nomAdmin: string;      // admin who sent it
  labelsEtValeurs: {     // array of fields label + values
    label: string;
    valeur: string;
    
  }[];
}
export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8089'  // URL de ton backend
};


export interface FieldDTO {
  label: string;
  type: string;
  required: boolean;
  options: string[];
}
export interface ReportFieldDTO {
  idReportField: number;
  id: number; // ✅ alias temporaire
  label: string;
  type: string;
  required: boolean;
  options?: string[]; 
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

     private apiUrl = 'http://localhost:8089/Ooredoo';

  constructor(private http: HttpClient ,
    private authService: AuthenticationService

  ) {}

  // Récupérer le token et créer les headers d'authentification
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // ou 'authToken' selon ce que tu stockes
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // Gestion des erreurs centralisée
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status}, message: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  // Users
  getAllUsers(): Observable<User[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<User[]>(`${this.apiUrl}/auth/admin/users`, { headers }).pipe(catchError(this.handleError));
  }

  getUserById(id: number) {
  const headers = this.getAuthHeaders(); // Ensure JWT/token is sent!
  return this.http.get<User>(`${this.apiUrl}/getUserById/${id}`, { headers });
}



  approveUser(userId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.post<void>(`${this.apiUrl}/auth/admin/approve/${userId}`, {}, { headers }).pipe(catchError(this.handleError));
  }

  // Zones
  getAllZones(): Observable<Zone[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Zone[]>(`${this.apiUrl}/getAllZones`, { headers }).pipe(catchError(this.handleError));
  }

  getZoneById(id: number): Observable<Zone> {
    const headers = this.getAuthHeaders();
    return this.http.get<Zone>(`${this.apiUrl}/getZoneById/${id}`, { headers }).pipe(catchError(this.handleError));
  }

  createZone(zone: Zone): Observable<Zone> {
    const headers = this.getAuthHeaders();
    return this.http.post<Zone>(`${this.apiUrl}/createZone`, zone, { headers }).pipe(catchError(this.handleError));
  }

  updateZone(id: number, zone: Zone): Observable<Zone> {
    const headers = this.getAuthHeaders();
    return this.http.put<Zone>(`${this.apiUrl}/updateZone/${id}`, zone, { headers }).pipe(catchError(this.handleError));
  }

  deleteZone(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/deleteZone/${id}`, { headers }).pipe(catchError(this.handleError));
  }

  // Shops
 getAllShops(): Observable<Shop[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Shop[]>(`${this.apiUrl}/getAllShops`, { headers }).pipe(catchError(this.handleError));
  }

  getShopById(id: number): Observable<Shop> {
    const headers = this.getAuthHeaders();
    return this.http.get<Shop>(`${this.apiUrl}/getShopById/${id}`, { headers }).pipe(catchError(this.handleError));
  }

  createShop(shop: Shop): Observable<Shop> {
    const headers = this.getAuthHeaders();
    return this.http.post<Shop>(`${this.apiUrl}/createShop`, shop, { headers }).pipe(catchError(this.handleError));
  }

  updateShop(id: number, shop: Shop): Observable<Shop> {
    const headers = this.getAuthHeaders();
    return this.http.put<Shop>(`${this.apiUrl}/updateShop/${id}`, shop, { headers }).pipe(catchError(this.handleError));
  }

  deleteShop(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/deleteShop/${id}`, { headers }).pipe(catchError(this.handleError));
  }

  archiveShop(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.put<void>(`${this.apiUrl}/archiveShop/${id}`, {}, { headers }).pipe(catchError(this.handleError));
  }
  getShopsByChefZone(userId: number): Observable<Shop[]> {
  return this.http.get<Shop[]>(`${this.apiUrl}/by-chefzone/${userId}`);
}
getShopsByChefZoneUsername(username: string): Observable<Shop[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Shop[]>(`${this.apiUrl}/by-chefzone-username/${username}`, { headers })
    .pipe(catchError(this.handleError));
}
getZoneByChefUsername(username: string): Observable<Zone> {
  const headers = this.getAuthHeaders();
  return this.http.get<Zone>(`${this.apiUrl}/zone/by-chef/${username}`, { headers });
}
getShopByAdminUsername(username: string): Observable<Shop> {
  const headers = this.getAuthHeaders();
  return this.http.get<Shop>(`${this.apiUrl}/shop/by-admin/${username}`, { headers });
}
getUserStatistics(): Observable<any> {
  return this.http.get<any>('http://localhost:8089/Ooredoo/auth/admin/user-statistics');
}


getZonePercentageByGouvernorat() {
  return this.http.get<{ [key: string]: number }>(`http://localhost:8089/Ooredoo/zones-by-gouvernorat`);
}

getShopPercentageByGouvernorat() {
  return this.http.get<{ [key: string]: number }>(`http://localhost:8089/Ooredoo/shops-by-gouvernorat`);
}

getShopPercentageByZonePerGouvernorat() {
  return this.http.get<{ [gov: string]: { [zoneId: number]: number } }>(`http://localhost:8089/Ooredoo/shops-by-zone-per-gouvernorat`);
}
getZonesWithoutChefCount(): Observable<number> {
  return this.http.get<number>(`http://localhost:8089/Ooredoo/zones-without-chef`);
}
getShopsByZone(zoneId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8089/Ooredoo/shops/${zoneId}`);

}
// in user.service.ts
getShopsWithoutAdmin(): Observable<Shop[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Shop[]>(`http://localhost:8089/Ooredoo/without-admin`, { headers });
}
getZonesWithoutChef(): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8089/Ooredoo/zones-without-chef`); // adapte l’URL si besoin
}
getSecteursDisponibles(): Observable<Secteur[]> {
    return this.http.get<Secteur[]>(`http://localhost:8089/Ooredoo/Secteursdisponibles`);

}

// Create a sector
createSecteur(secteur: Secteur): Observable<Secteur> {
  const headers = this.getAuthHeaders();
  return this.http.post<Secteur>(`${this.apiUrl}/createSecteur`, secteur, { headers }).pipe(catchError(this.handleError));
}

// Get all sectors
getAllSecteurs(): Observable<Secteur[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Secteur[]>(`${this.apiUrl}/getAllSecteurs`, { headers }).pipe(catchError(this.handleError));
}

// Get sector by ID
getSecteurById(id: number): Observable<Secteur> {
  const headers = this.getAuthHeaders();
  return this.http.get<Secteur>(`${this.apiUrl}/getSecteurById/${id}`, { headers }).pipe(catchError(this.handleError));
}

// Delete sector
deleteSecteur(id: number): Observable<void> {
  const headers = this.getAuthHeaders();
  return this.http.delete<void>(`${this.apiUrl}/deleteSecteur/${id}`, { headers }).pipe(catchError(this.handleError));
}
getAllRegions(): Observable<Region[]> {
  return this.http.get<Region[]>('http://localhost:8089/Ooredoo/getAllRegions');
}


// ✅ GET BY ID
getRegionById(id: number): Observable<Region> {
  const headers = this.getAuthHeaders();
  return this.http.get<Region>(`${this.apiUrl}/getRegionById/${id}`, { headers }).pipe(catchError(this.handleError));
}

// ✅ CREATE
createRegion(region: Region): Observable<Region> {
  const headers = this.getAuthHeaders();
  return this.http.post<Region>(`${this.apiUrl}/createRegion`, region, { headers }).pipe(catchError(this.handleError));
}

// ✅ UPDATE
updateRegion(id: number, region: Region): Observable<Region> {
  const headers = this.getAuthHeaders();
  return this.http.put<Region>(`${this.apiUrl}/updateRegion/${id}`, region, { headers }).pipe(catchError(this.handleError));
}

// ✅ DELETE
deleteRegion(id: number): Observable<void> {
  const headers = this.getAuthHeaders();
  return this.http.delete<void>(`${this.apiUrl}/deleteRegion/${id}`, { headers }).pipe(catchError(this.handleError));
}

getAllFields() {
  return this.http.get<Field[]>('http://localhost:8089/Ooredoo/fields/all');
}





 
  markAsRead(reportId: number, username: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/mark-as-read/${reportId}?username=${username}`, {});
  }

getRegionsWithoutChef(): Observable<Region[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Region[]>(`${this.apiUrl}/regions-without-chef`, { headers })
    .pipe(catchError(this.handleError));
}
getRegionByChefUsername(username: string): Observable<Region> {
  const headers = this.getAuthHeaders();
  return this.http.get<Region>(`${this.apiUrl}/region/by-chef/${username}`, { headers });
}
getShopsByChefRegion(username: string): Observable<Shop[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Shop[]>(`${this.apiUrl}/shops/by-chefregion/${username}`, { headers });
}
 getDashboardStatsForChefRegion(username: string): Observable<DashboardRegionDTO> {
    const headers = this.getAuthHeaders();
    return this.http.get<DashboardRegionDTO>(`${this.apiUrl}/region/${username}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }
getDashboardStatsForChefZone(username: string): Observable<DashboardZoneDTO> {
  const headers = this.getAuthHeaders();
  return this.http.get<DashboardZoneDTO>(`${this.apiUrl}/dashboard?username=${username}`, { headers })
    .pipe(catchError(this.handleError));
}
getSecteurByChefUsername(username: string) {
  const headers = this.getAuthHeaders();
  return this.http.get<Secteur>(`${this.apiUrl}/secteur/by-chef/${username}`, { headers });
}

getZonesBySecteurId(secteurId: number): Observable<Zone[]> {
    return this.http.get<Zone[]>(`${this.apiUrl}/secteurs/${secteurId}/zones`);
  }
  getZonesByChefSecteurUsername(username: string): Observable<Zone[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<Zone[]>(`${this.apiUrl}/zones/by-chefsecteur/${username}`, { headers })
    .pipe(catchError(this.handleError));
}


createReport(reportData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createReport`, reportData);
  }

 getReportsForDestinataire(username: string): Observable<DestinataireReportDTO[]> {
  const headers = this.getAuthHeaders(); // ✅ inclure le token
  return this.http.get<DestinataireReportDTO[]>(
    `${this.apiUrl}/reports/for-destinataire/${username}`, // ✅ bonne URL
    { headers }
  );
}
getReportById(id: number): Observable<ReportDTO> {
  const headers = this.getAuthHeaders();
  return this.http.get<ReportDTO>(`${this.apiUrl}/report/${id}`, { headers });
}


 getReportFields(reportId: number): Observable<ReportField[]> {
    return this.http.get<ReportField[]>(`${this.apiUrl}/${reportId}/fields`);
  }
submitReport(reportId: number, payload: ReportFieldValueDTO[]): Observable<string> {
  const headers = this.getAuthHeaders();
  const username = this.authService.getUsername();
  return this.http.post<string>(
    `${this.apiUrl}/report/${reportId}/submit?username=${username}`, 
    payload, 
    { headers, responseType: 'text' as 'json' }
  );
}


getReportDetails(idReport: number): Observable<ReportWithValuesDTO> {
  const headers = this.getAuthHeaders();
  return this.http.get<ReportWithValuesDTO>(`${this.apiUrl}/report/${idReport}/details`, { headers });
}


// user.service.ts

getAllReports(): Observable<DestinataireReportDTO[]> {
  const headers = this.getAuthHeaders();
  return this.http.get<DestinataireReportDTO[]>(`${this.apiUrl}/reports/all`, { headers });
}


addField(fieldDTO: FieldDTO): Observable<Field> {
    return this.http.post<Field>(`${this.apiUrl}/addField`, fieldDTO);
  }
getReportDTOById(id: number): Observable<DestinataireReportDTO> {
  const headers = this.getAuthHeaders();
  return this.http.get<DestinataireReportDTO>(`${this.apiUrl}/report/${id}`, { headers });
}
submitReportWithFormData(reportId: number, username: string, formData: FormData) {
  return this.http.post(
    `${this.apiUrl}/report/${reportId}/submit?username=${username}`,
    formData,
    { responseType: 'text' }  // <-- Important, attendre une réponse en texte
  );
}

getReportWithValues(idReport: number): Observable<DestinataireReportDTO> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.authService.getToken()}`
  });
  return this.http.get<DestinataireReportDTO>(`http://localhost:8089/Ooredoo/reportwithvalues/${idReport}`, { headers });
}
getPhotoUrl(relativePath: string): string {
  return environment.apiBaseUrl + relativePath;

}
}
