import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ConstantsService } from 'src/app/Services/constants.service';
import { TokenService } from 'src/app/Services/token.service';
import { CompanyOverviewComponent } from '../company-overview/company-overview.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  private cloudinaryInstance: any;
  constructor(private http: HttpClient, private constants: ConstantsService, private token: TokenService, private company: CompanyOverviewComponent, private router: Router) {
    ;
  }
  title = ''
  imageurl = "assets/add.png"
  description = ''
  briefDescription = ''
  price = ''
  category = "Category"
  submission_succussful = false
  checkError = false
  isLoading=false


  selectedFile?: File;

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    const fileType = file.type;
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const validFileSize = 2 * 1024 * 1024; // 2MB in bytes

    if (validImageTypes.includes(fileType)) {
      if (file.size <= validFileSize) {
        this.selectedFile = file;
        // Read the selected file as a data URL
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          // Set the imageUrl property to the data URL
          this.imageurl = reader.result as string;
        };
      } else {
        alert('Please select an image file with a size less than or equal to 2MB.');
      }
    } else {
      alert('Please select a valid image file (JPEG, PNG, or GIF).');
    }
  }
  onDone() {
    this.submission_succussful = false
    this.router.navigateByUrl('s/seller')

  }
  checkPrice(): boolean {
    const x = parseInt(this.price)
    if ((x > 10000 || x < 10) && this.price.toString() != '') {
      return true
    }
    return false
  }
  async createService(image: String) {

    if (this.file) {
      await this.uploadVideo();
    } else {
      this.videoId = '0'
    }
  
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token.getToken(),
        'Content-Type': 'application/json'
      })
    }

    interface MyResponse { response: String }
    this.http.post<MyResponse>(this.constants.ServerIp + '/services', {
      "name": this.title,
      "companyId": this.company.company?.companyId,
      'description': this.description,
      'more_description': this.briefDescription,
      'category': this.category,
      'date': 'date',
      'image': image,
      'video': this.videoId,
      'price': this.price,
      'review': 0
    }, httpOptions).subscribe(
      response => {
      if (response.response.includes('done')) {
        this.isLoading=false
        window.scrollTo({ top: 100, behavior: 'smooth' });
        setTimeout(() => {
          this.submission_succussful = true
        }, 500)
      }
    },
    error =>{
      this.isLoading=false
      alert('Error Creating Service')
    })
  }
  uploadImage(file: File) {
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
        this.createService(response.response)
      }, error => {
        this.isLoading=false
        alert('Error Uploading Image')
      }
    )
  }
  async getCompany() {
    while (!this.company.company) {
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  }

  onSubmit() {
    this.checkError = true
    if (this.title.length > 9 && this.title.length < 51 && !this.checkPrice() && this.category != 'Category' && this.description.length < 151 && this.description.length > 99 && this.briefDescription.length < 501 && this.briefDescription.length > 299) {
      if (this.imageurl != "assets/add.png") {
        this.isLoading=true
        this.uploadImage(this.selectedFile!)
      } else {
        alert('Image is required.')
      }

    }
  }

  //-------------------------------------------------

  private file?: File;
  videoUrl?: string;
  videoId='0';

  onVideoSelected(event: any): void {
    this.file = event.target.files[0];
    this.videoUrl = URL.createObjectURL(this.file!);
    this.videoPlayer.nativeElement.src = this.videoUrl;
  }



  async uploadVideo() {
    const url = this.constants.ServerIp + "/video";
    const headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.token.getToken(),
      'Accept': 'application/json'
    });
    const formData = new FormData();
    formData.append('file', this.file!, this.file!.name);
    interface Myresponse {
      response: string;
    }

    try {
      const response = await new Promise<Myresponse>((resolve, reject) => {
        this.http.post<Myresponse>(url, formData, { headers: headers }).subscribe(
          (response: Myresponse) => {
            resolve(response);
          }, (error) => {
            reject(error);
          }
        );
      });

      this.videoId = response.response;
      console.log(this.videoId);
    } catch (error) {
      this.isLoading=false
      alert('Error Uploading Video')
    }
  }

}
