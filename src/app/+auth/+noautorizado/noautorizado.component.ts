import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

declare var $: any;

@Component({
  selector: 'app-noautorizado',
  templateUrl: './noautorizado.component.html',
  styleUrls: [
    './noautorizado.component.css'
  ]
})
export class NoAutorizadoComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit() {
    this.resizeWindow();

    $(window).bind("load resize scroll", () => {
      this.resizeWindow();
    });

    $(document).ready(() => {
      this.resizeWindow();
    });
  }

  resizeWindow () {
    $('#content').css("height", $(window).height() + "px");
  }

  login(event){

    event.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }



}
