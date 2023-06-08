import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent {

  constructor(private http: HttpClient, private constants: ConstantsService, private token: TokenService,private router:Router) { }

  fullName = ""
  displayName = ""
  logo = ""
  website = ""
  country = "Select a country"
  category = "Select a Category"
  state = ""
  city = ""
  adress = ""
  postalCode = ""
  corporation = ""
  businessNumber = ""
  description = ""
  checkError = false
  imageUrl = "assets/start_selling_navbar/photo.png";
  isHighlighted = false
  isLoading = false
  submission_succussful=false

  onContinue1() {
    interface Myresponse {
      request: String;
      response: String;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.post<Myresponse>(this.constants.ServerIp + "/company/" + this.token.getUser(), {
      'corporation': this.corporation,
      'businessNumber': this.businessNumber,
      'fullName': this.fullName,
      'displayName': this.displayName,
      'logo': this.logo,
      'website': this.website,
      'category':this.category,
      'country': this.country,
      'state': this.state,
      'city': this.city,
      'adress': this.adress,
      'postalCode': this.postalCode,
      'description': this.description
    }, httpOptions).subscribe(
      async response => {
        if (response.response.includes("Company Already Exist!")) {
          this.isLoading = false;
          setTimeout(() => {
            alert("Company Already Exist!")
          }, 100);
        } else if (response.response.includes("false")) {
          this.isLoading = false;
          setTimeout(() => {
            alert(" Your company's corporation ID or business number does not exist. Please verify the information and try again.")
          }, 100);
        } else if (response.response.includes("done")) {
          this.uploadImage(this.selectedFile!)
        } else {
          this.isLoading = false
          setTimeout(() => {
            alert("Error connecting to server")
          }, 100);

        }
      },
      error => {
        this.isLoading = false
        setTimeout(() => {
          alert("Error connecting to server")
        }, 100);
      }
    )
  }

  updateImage() {
    interface Myresponse {
      request: String;
      response: String;
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    };
    this.http.get<Myresponse>(this.constants.ServerIp + "/company/image/" +this.businessNumber+"/"+this.logo,  httpOptions).subscribe(
      async response => {
        this.isLoading = false
       if(response.response.includes("done")){
        setTimeout(() => {
          this.submission_succussful=true
        }, 100);
       }else{
        setTimeout(() => {
          alert("Error connecting to server")
        }, 100);
       }
      },
      error => {
        this.isLoading = false
        setTimeout(() => {
          alert("Error connecting to server")
        }, 100);
      }
    )
  }

  uploadImage(file: File) {
    this.isLoading = true
    const url = this.constants.ServerIp + "/images";
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.token.getToken(),
      'Accept': 'application/json'
    });
    const formData = new FormData();
    formData.append('file', file, file.name);
    interface Myresponse {
      response: string;
    }
    this.http.post<Myresponse>(url, formData, { headers: headers }).subscribe(
      response => {
        this.logo = response.response
        this.updateImage()
      }, error => {
        this.isLoading = false
      }
    )
  }

  selectedFile?: File;

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileType = file.type;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validFileSize = 2 * 1024 * 1024; // 2MB in bytes

    if (validImageTypes.includes(fileType)) {
      if (file.size <= validFileSize) {
        this.selectedFile = file;
        this.isHighlighted = true
        // Read the selected file as a data URL
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // Set the imageUrl property to the data URL
          this.imageUrl = reader.result as string;
        };
      } else {
        alert('Please select an image file with a size less than or equal to 2MB.');
      }
    } else {
      alert('Please select a valid image file (JPEG, PNG, or GIF).');
    }
  }

  checkInput(): boolean {
    if (this.fullName.length > 0 && this.displayName.length > 0 && this.website.length > 0 && this.state.length > 0 && this.city.length > 0 && this.adress.length > 0 && this.postalCode.length > 0 && this.corporation.toString().length > 0 && this.businessNumber.toString().length > 0 && this.description.length > 200 && this.description.length < 600 && !this.country.includes("Select a country")) {
      if (!this.imageUrl.includes("assets/start_selling_navbar/photo.png")) {
        return true
      } else {
        alert("Logo is required.")
        return false
      }
    }
    return false
  }
  onDone(){
    this.submission_succussful=false
    this.router.navigateByUrl('s/seller/under_review')
  }

  onContinue() {
    if (this.checkInput()) {
      this.checkError = false
      this.isLoading = true
      this.onContinue1()
    } else {
      this.checkError = true
    }
  }

}
