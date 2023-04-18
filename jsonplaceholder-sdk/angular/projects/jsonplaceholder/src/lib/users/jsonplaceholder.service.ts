import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, of, Subscription } from 'rxjs';
import { JsonPlaceholderUser } from './jsonplaceholder.interface';
import { z, ZodSchema } from "zod";

export * from './jsonplaceholder.interface';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceholderUsersService {
  private usersSubscription: Subscription;

  public users: BehaviorSubject<Array<JsonPlaceholderUser>>;
  public usersSchema: ZodSchema<Array<JsonPlaceholderUser>>;
  public error: BehaviorSubject<Error | null>;
  public loading: BehaviorSubject<boolean>;

  public constructor(private readonly httpClient: HttpClient) {
    this.usersSubscription = new Subscription();
    this.error = new BehaviorSubject<Error | null>(null);
    this.loading = new BehaviorSubject<boolean>(false);
    this.users = new BehaviorSubject<Array<JsonPlaceholderUser>>([]);

    this.usersSchema = z.array(z.object({
      id: z.number(),
      name: z.string(),
      username: z.string(),
      email: z.string(),
      address: z.object({
        street: z.string(),
        suite: z.string(),
        city: z.string(),
        zipcode: z.string(),
        geo: z.object({
          lat: z.string(),
          lng: z.string()
        })
      }),
      phone: z.string(),
      website: z.string(),
      company: z.object({
        name: z.string(),
        catchPhrase: z.string(),
        bs: z.string()
      })
    }));
  }

  public fetchUsers(): void {
    this.loading.next(true);
    this.error.next(null);

    this.usersSubscription = this.httpClient.get('https://jsonplaceholder.typicode.com/users').pipe(
      map(json => {
        return this.usersSchema.parse(json);
      }),
      catchError((error: Error) => {
        this.error.next(error);
        return of([]);
      }),
      finalize(() => {
        this.loading.next(false);
      })
    ).subscribe((users) => {
      this.users.next(users);
    });
  }

  public abortFetchUsers(): void {
    this.usersSubscription.unsubscribe();
    this.error.next(new Error('Fetch users aborted'));
    this.loading.next(false);
  }
}
