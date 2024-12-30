
using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using API.Extensions;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class BaseApiController : ControllerBase
    {
        private IMediator _mediator;

        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

        protected ActionResult HandleResult<T>(Result<T> result) 
        {
            if (result == null) return NotFound();
            if (result.IsSucess && result.Value != null)
                return Ok(result.Value);
            else if (result.IsSucess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }

        protected ActionResult HandlePageResult<T>(Result<PageList<T>> result)
        {
            if (result == null) return NotFound();
            if (result.IsSucess && result.Value != null)
            {
                Response.AddPaginationHeader(result.Value.CurrentPage, result.Value.PageSize, result.Value.TotalCount, result.Value.TotalPages);
                return Ok(result.Value);
            }
            else if (result.IsSucess && result.Value == null)
                return NotFound();
            return BadRequest(result.Error);
        }

    }
}