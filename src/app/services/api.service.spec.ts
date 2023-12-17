import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { Observable } from 'rxjs';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController

  const VALID_USER_NAME = 'johnpapa'
  const INVALID_USER_NAME = 'raghuramdev5'
  const USER_DETAILS = {
    "login": "johnpapa",
    "avatar_url": "https://avatars.githubusercontent.com/u/1202528?v=4",
    "html_url": "https://github.com/johnpapa",
    "name": "John Papa",
    "location": "Orlando, FL",
    "bio": "Winter is Coming",
    "twitter_username": "john_papa",
    "public_repos": 144,
  };

  const USER_REPOS = [    
    {
      "name": "angular-event-view-cli",
      "description": "Angular Demo with a Little bit of a lot of features",
      "topics": ['angular','typescript']
    }
  ];

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: []
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data from GET request', () => {
    service.getUser(VALID_USER_NAME).subscribe((data) =>{
        expect(data).toEqual(USER_DETAILS)
      }
    )

    const req = httpTestingController.expectOne(service.BASE_URL + VALID_USER_NAME);

    expect(req.request.method).toEqual('GET');

    req.flush(USER_DETAILS);

  });

  it('should return error message for user get request', ()=> {

    service.getUser(INVALID_USER_NAME).subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err).toEqual(new Error('404 - error request'));
      }
    })
    const req = httpTestingController.expectOne(service.BASE_URL + INVALID_USER_NAME);

    // Respond with mock error
    req.flush("error request", { status: 404, statusText: 'Not Found' })
  })


  it('should return user repos data from GET request', () => {
    const PAGE = 1;
    const PER_PAGE = 1;

    service.getUserRepos(VALID_USER_NAME,PAGE,PER_PAGE).subscribe((data) =>{
        expect(data).toEqual(USER_REPOS)
      }
    )

    const req = httpTestingController.expectOne(service.BASE_URL+VALID_USER_NAME+`/repos?page=${PAGE}&per_page=${PER_PAGE}`);

    expect(req.request.method).toEqual('GET');

    req.flush(USER_REPOS);

  });


  it('should return error message from user repos GET request', () => {
    const PAGE = 160;
    const PER_PAGE = 10;

    service.getUserRepos(VALID_USER_NAME,PAGE,PER_PAGE).subscribe({
      next: () => fail('should have failed with 404 error'),
      error: (err) => {
        expect(err).toBeTruthy();
        expect(err).toEqual(new Error('404 - error request'))
      }
    }
    )

    const req = httpTestingController.expectOne(service.BASE_URL+VALID_USER_NAME+`/repos?page=${PAGE}&per_page=${PER_PAGE}`);

    expect(req.request.method).toEqual('GET');

    req.flush("error request", { status: 404, statusText: 'Not Found' })

  });


  afterEach(() => {
    httpTestingController.verify();
  })
});
