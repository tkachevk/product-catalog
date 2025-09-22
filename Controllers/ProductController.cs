using Microsoft.AspNetCore.Mvc;

namespace EldudkaAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly CSService _csService;

        public ProductController(CSService csService)
        {
            _csService = csService;
        }

        [HttpGet("GetList")]
        public async Task<IEnumerable<ProductDTO>> GetList()
        {
            var products = await _csService.GetAllProducts();

            return products.Select(p => ProductMapper.Map(p)).ToList();
        }

        [HttpPost("GetByIds")]
        public async Task<IEnumerable<ProductDTO>> GetByIds([FromBody] Guid[] ids)
        {
            var products = await _csService.GetAllProducts();

            var filteredData = products.Where(p => ids.Contains(p.UUID));

            return filteredData.Select(p => ProductMapper.Map(p)).ToList();
        }

        [HttpGet("GetById")]
        public async Task<ProductDTO> GetById(Guid id)
        {
            var products = await _csService.GetAllProducts();

            var product = products.First(p => p.UUID == id);

            return ProductMapper.Map(product);
        }
    }
}
