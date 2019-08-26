using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using FinstaRepository.DataAccess.Loans.Masters;
using FinstaRepository.Interfaces.Loans.Masters;
using FinstaRepository.Interfaces.Settings;
using FinstaRepository.DataAccess.Settings;
using FinstaInfrastructure.Settings;
using Microsoft.AspNetCore.Cors;

namespace FinstaApi.Controllers.Settings
{
    //[Route("api/[controller]")]
    [ApiController]
    [EnableCors("CorsPolicy")]
    public class SettingsController : ControllerBase
    {
        string Con = string.Empty;
        static IConfiguration _iconfiguration;
        public SettingsController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            Con = _iconfiguration.GetSection("ConnectionStrings").GetSection("Connection").Value;
        }
        ISettings obj = new SettingsDAL();
        List<SettingsDTO> lstlocations { get; set; }
        List<SettingsDTO> lsttitles { get; set; }

        List<SettingsDTO> lstCompanyDetails { get; set; }

        List<SettingsDTO> lstBranchDetails { get; set; }
        List<SettingsDTO> lstApplciantypes { get; set; }
        [Route("api/Settings/getContacttitles")]

        public List<SettingsDTO> getContacttitles()
        {
            lsttitles = new List<SettingsDTO>();
            try
            {
                lsttitles = obj.getContacttitles(Con);

            }
            catch (Exception)
            {
                throw;
            }
            return lsttitles;

        }

        [Route("api/Settings/getCountries")]

        public List<SettingsDTO> getCountries()
        {
            lstlocations = new List<SettingsDTO>();
            try
            {
                lstlocations = obj.getCountries(Con);

            }
            catch (Exception)
            {
                throw;
            }
            return lstlocations;

        }

        [Route("api/Settings/getStates")]
        public List<SettingsDTO> getStates(int id)
        {
            lstlocations = new List<SettingsDTO>();
            try
            {
                lstlocations = obj.getStates(Con, id);

            }
            catch (Exception)
            {
                throw;
            }
            return lstlocations;

        }


        [Route("api/Settings/getDistricts")]
        public List<SettingsDTO> getDistricts(int id)
        {
            lstlocations = new List<SettingsDTO>();
            try
            {
                lstlocations = obj.getDistricts(Con, id);

            }
            catch (Exception)
            {
                throw;
            }
            return lstlocations;

        }

        [Route("api/Settings/getCompanyandbranchdetails")]

        public List<SettingsDTO> getCompanyandbranchdetails()
        {
            lstCompanyDetails = new List<SettingsDTO>();
            try
            {
                lstCompanyDetails = obj.getCompanyandbranchdetails(Con);

            }
            catch (Exception)
            {
                throw;
            }
            return lstCompanyDetails;

        }

        [Route("api/Settings/getApplicanttypes")]
        public List<SettingsDTO> getApplicanttypes(string contacttype)
        {
            lstApplciantypes = new List<SettingsDTO>();
            try
            {
                lstApplciantypes = obj.getApplicanttypes(contacttype, Con);

            }
            catch (Exception)
            {
                throw;
            }
            return lstApplciantypes;

        }

    }
}