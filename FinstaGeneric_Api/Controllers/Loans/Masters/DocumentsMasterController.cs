using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FinstaApi.Common;
using FinstaInfrastructure.Loans.Masters;
using FinstaRepository.DataAccess.Loans.Masters;
using FinstaRepository.Interfaces.Loans.Masters;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
namespace FinstaApi.Controllers.Loans.Masters
{
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class DocumentsMasterController : ControllerBase
    {
        IDocumentsMaster obj = new DocumentsMasterDAL();
        string Con = string.Empty;
        static IConfiguration _iconfiguration;
        public DocumentsMasterController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            Con = _iconfiguration.GetSection("ConnectionStrings").GetSection("Connection").Value;
        }

        [Route("api/loans/masters/documentsmaster/SaveDocumentGroup")]
        [HttpPost]
        public bool SaveDocumentGroup(DocumentsMasterDTO Documents)
        {
         
            try
            {
                return obj.SaveDocumentGroup(Documents,Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
        }
        [Route("api/loans/masters/documentsmaster/SaveIdentificationDocuments")]
        [HttpPost]
        public bool SaveIdentificationDocuments(DocumentsMasterDTO Documents)
        {
            try
            {
             return   obj.SaveIdentificationDocuments(Documents,Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
        }

        [Route("api/loans/masters/documentsmaster/Getdocumentidprofftypes")]
        [HttpPost]
        public List<DocumentsMasterDTO> Getdocumentidprofftypes(LoanIdDTO Documents)
        {
            try
            {
                return obj.Getdocumentidprofftypes(Con, Documents);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }

        }

        [Route("api/loans/masters/documentsmaster/GetDocumentGroupNames")]
        public List<DocumentsMasterDTO> GetDocumentGroupNames()
        {

            try
            {
                return obj.GetDocumentGroupNames(Con);
            }
            catch (Exception ex)
            {

                throw new FinstaAppException(ex.ToString());
            }
        }
    }
}