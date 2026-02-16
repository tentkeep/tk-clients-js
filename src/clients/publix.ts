import got from 'got'

export interface GalleryEntryItem {
  id: string
  name: string
  imageUrl: string
  price: number
  description?: string
  url?: string
}

export class PublixApiClient {
  private baseUrl: string

  constructor(baseUrl: string = 'https://www.publix.com/api/v1') {
    this.baseUrl = baseUrl
  }

  async searchProducts(
    query: string,
    limit: number = 20,
  ): Promise<GalleryEntryItem[]> {
    const response = await got.get(`${this.baseUrl}/search/product`, {
      searchParams: {
        q: query,
        pageSize: limit,
      },
      responseType: 'json',
    })

    // Adapt the response to GalleryEntryItem[]
    return (response.data?.products || []).map((product: any) => ({
      id: product.id,
      name: product.name,
      imageUrl: product.images?.[0]?.url || '',
      price: product.price?.sale || product.price?.regular || 0,
      description: product.description,
      url: product.productUrl,
    }))
  }
}
