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
    public class ChargesMasterController : ControllerBase
    {
        IChargesMaster objChargemaster = new ChargesMasterDAL();
        List<ChargesMasterDTO> lstchargesmaster { get; set; }
        string Con = string.Empty;
        static IConfiguration _iconfiguration;
        public ChargesMasterController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            Con = _iconfiguration.GetSection("ConnectionStrings").GetSection("Connection").Value;
        }
        [Route("api/loans/masters/ChargesMaster/SaveChargeName")]
        [HttpPost]
        public void SaveChargeName(ChargesMasterDTO _Charges)
        {
            try
            {
                objChargemaster.SaveChargesName(_Charges,Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
        }
        [Route("api/loans/masters/ChargesMaster/GetChargesName")]
        public List<ChargesMasterDTO> GetChargesName()
        {
            try
            {
                return objChargemaster.GetChargesName(Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }

        }
        [Route("api/loans/masters/ChargesMaster/SaveLoanWiseChargeTypes")]
        [HttpPost]
        public void SaveLoanWiseChargeTypes(ChargesMasterDTO _Charges)
        {
            try
            {
                objChargemaster.SaveLoanWiseChargeTypes(_Charges, Con);
            }
            catch (Exception ex)
            {

                throw new FinstaAppException(ex.ToString());
            }
        }
        [Route("api/loans/masters/ChargesMaster/GetLoanchargetypes")]
        public List<ChargesMasterDTO> GetLoanchargetypes()
        {
            try
            {
                return objChargemaster.GetLoanchargetypes(Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }

        }
        [Route("api/loans/masters/ChargesMaster/SaveLoanWiseChargeConfig")]
        [HttpPost]
        public void SaveLoanWiseChargeConfig(ChargesMasterDTO _Charges)
        {
            try
            {
                objChargemaster.SaveLoanWiseChargeConfig(_Charges, Con);
            }
            catch (Exception ex)
            {

                throw new FinstaAppException(ex.ToString());
            }
        }


    }
}