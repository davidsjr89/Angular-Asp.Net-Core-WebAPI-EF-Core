using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SmartSchool_WEBAPI.Data;
using SmartSchool_WEBAPI.Models;

namespace SmartSchool_WEBAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AlunoController : ControllerBase
    {
        private readonly IRepository _repo;
        public AlunoController(IRepository repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                return Ok(await _repo.GetAllAlunosAsync(true));
            }
            catch (Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }
        [HttpGet("{AlunoId}")]
        public async Task<IActionResult> GetByAlunoId(int AlunoId)
        {
            try
            {
                return Ok(await _repo.GetAlunoAsyncById(AlunoId, true));
            }
            catch(Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }
        [HttpGet("ByDisciplina/{disciplinaId}")]
        public async Task<IActionResult> GetByDisciplinaId(int disciplinaId)
        {
            try
            {
                return Ok(await _repo.GetAlunosAsyncByDisciplinaId(disciplinaId, false));
            }
            catch(Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post(Aluno model)
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
        [HttpPut("{AlunoId}")]
        public async Task<IActionResult> Put(int alunoId, Aluno model)
        {
            try
            {
                var aluno = await _repo.GetAlunoAsyncById(alunoId, false);
                if(aluno == null) return NotFound("Aluno não encontrado");

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
        [HttpDelete("{AlunoId}")]
        public async Task<IActionResult> Delete(int alunoId)
        {
            try
            {
                var aluno = await _repo.GetAlunoAsyncById(alunoId, false);
                if(aluno == null) return NotFound();

                _repo.Delete(aluno);
                
                if(await _repo.SaveChangesAsync())
                    return Ok(new {message = "Deletado"});
            }
            catch(Exception e)
            {
                return BadRequest($"Erro: {e.Message}");
            }
            return BadRequest();
        }
        
    }
}