import { Component, HostListener } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
})
export class FooterComponent {
    showScrollButton = false;

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        this.checkScrollPosition();
    }

    checkScrollPosition() {
        this.showScrollButton = window.scrollY > 500;
    }

    //Responsible for making button scroll up
    //Lebohang Mokoena
    //2023/08/22
    scrollToTop() {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
