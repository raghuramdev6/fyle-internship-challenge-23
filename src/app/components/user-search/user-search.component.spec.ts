import { ComponentFixture, TestBed } from "@angular/core/testing"
import { UserRepoListComponent } from "../user-repo-list/user-repo-list.component"
import { UserSeachCompnent } from "./user-search.component"
import { ElementModule } from "src/app/elements/element.module"
import { HttpClientModule } from "@angular/common/http"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { DebugElement } from "@angular/core"

describe('UserSearchCompoenet', () => {
    let comp : UserSeachCompnent
    let fixture : ComponentFixture<UserSeachCompnent>;
    let de : DebugElement
    let he : HTMLElement
    let e1 : HTMLElement

    beforeEach(async ()=> TestBed.configureTestingModule({
        declarations: [
            UserSeachCompnent,
            UserRepoListComponent
        ],
        imports: [
            ElementModule,
            HttpClientModule,
            BrowserAnimationsModule
        ]
    }).compileComponents().then(() =>{
        fixture = TestBed.createComponent(UserSeachCompnent);
        //instance of root component class
        comp = fixture.componentInstance;

        // The elemets own component instance
        de = fixture.debugElement;

        // The underlying DOM element at the root of the component
        he = de.nativeElement;
    })
    )

    it('it should create instance of UserSearchComponent', ()=>{
        expect(comp).toBeTruthy();
    })

    it(`should have title as 'Search GitHub User Public Repositories'`, ()=>{
        expect(comp.title).toEqual('Search GitHub User Public Repositories');
    })

    it(`should have subtitle as 'By Providing GitHub Username'`, ()=>{
        expect(comp.subTitle).toEqual('By Providing GitHub Username');
    })

    it(`should render title in 'span'`, ()=>{
        fixture.detectChanges();
        const compiled = de.nativeElement;
        expect(compiled.querySelector('span').textContent).toEqual('Search GitHub User Public Repositories');
    })

    it(`should render subtitle in 'p' tag`, ()=>{
        fixture.detectChanges();
        const compiled = de.nativeElement;
        expect(compiled.querySelector('p').textContent).toEqual('By Providing GitHub Username');
    })

    it(`should call search method on click`, ()=>{
        fixture.detectChanges();
        spyOn(comp,'onSearch')
        e1 = de.nativeElement.querySelector('button')
        e1.click()
        expect(comp.onSearch).toHaveBeenCalled();
    })

    it(`Username field should be valid`, ()=>{
        comp.user.user_name.value = "johnpapa"
        expect(comp.user.validate()).toBeTruthy();
    })

    it(`Username field should be invalid`, ()=>{
        comp.user.user_name.value = ""
        expect(comp.user.validate()).toBeFalsy();
    })
})