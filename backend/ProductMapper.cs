namespace EldudkaAPI
{
    public static class ProductMapper
    {
        public static ProductDTO Map(CSProduct product)
        {
            return new ProductDTO()
            {
                UUID = product.UUID,
                Name = product.Name,
                Images = product.Pic,
                Description = product.Description,
                Price = product.Price,
                Availability = new List<AvailabilityDTO>
                {
                    new AvailabilityDTO
                    {
                        Shop = new ShopDTO() { Name = "Кулакова" },
                        Count = product.Stock.Kulakova
                    },
                    new AvailabilityDTO
                    {
                        Shop = new ShopDTO() { Name = "Тухачевского" },
                        Count = product.Stock.Tukhachevsky
                    },
                    new AvailabilityDTO
                    {
                        Shop = new ShopDTO() { Name = "Шоколад" },
                        Count = product.Stock.Chocolate
                    },
                    new AvailabilityDTO
                    {
                        Shop = new ShopDTO() { Name = "Галлерея" },
                        Count = product.Stock.Gallery
                    }
                }
            };
        }
    }
}
