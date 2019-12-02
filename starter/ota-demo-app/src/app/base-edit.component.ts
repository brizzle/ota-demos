export class BaseEditComponent {
  public title: string;
  public constructor() {}

  protected setTitle(id): void {
    this.title = id ? 'Edit' : 'Add';
  }
}
