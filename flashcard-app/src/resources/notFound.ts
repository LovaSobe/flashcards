export class notFound {
  slug: string; 

  activate(params: { slug: string}){
    this.slug = params.slug; 
  }
}
