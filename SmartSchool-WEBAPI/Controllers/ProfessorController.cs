using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartSchool_WEBAPI.Data;
using SmartSchool_WEBAPI.Models;

namespace SmartSchool_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProfessorController : ControllerBase
    {
        private readonly IRepository _repo;
        public ProfessorController(IRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _repo.GetAllProfessoresAsync(false));
            }
            catch(Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }
         [HttpGet("{ProfessorId}")]
         public async Task<IActionResult> GetByProfessorId(int professorId)
         {
            try
            {
                return Ok(await _repo.GetProfessorAsyncById(professorId, true));
            }
            catch(Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
         }
        [HttpGet("ByAluno/{alunoId}")]
        public async Task<IActionResult> GetProfessoresAsyncByAlunoId(int alunoId)
        {
            try
            {
                return Ok(await _repo.GetProfessoresAsyncByAlunoId(alunoId, false));
            }
            catch(Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }
         [HttpPost]
         public async Task<IActionResult> Post(Professor model)
         {
            try
            {
                _repo.Add(model);
                if(await _repo.SaveChangesAsync())
                return Ok(model);
            }
            catch(Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
            return BadRequest();
         }
         [HttpPut("{ProfessorId}")]
         public async Task<IActionResult> Put(Professor model, int professorId)
         {
            try
            {
                var professor = await _repo.GetProfessorAsyncById(professorId, false);
                if(professor == null) return BadRequest("Não existe professor");
                _repo.Update(model);

                if(await _repo.SaveChangesAsync())
                    return Ok(model);
            }
            catch(Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
            return BadRequest();
         }
         [HttpDelete("{ProfessorId}")]
         public async Task<IActionResult> Delete(int professorId)
         {
            try
            {
                var professor = await _repo.GetProfessorAsyncById(professorId, false);
                if(professor == null) return BadRequest();
                _repo.Delete(professor);
                if(await _repo.SaveChangesAsync())
                return Ok("Deletado");
            }
            catch(Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
            return BadRequest();
         }
    }
}