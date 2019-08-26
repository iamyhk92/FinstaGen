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
    public class ContactMasterController : ControllerBase
    {

        string Con = string.Empty;
        static IConfiguration _iconfiguration;
        public ContactMasterController(IConfiguration iconfiguration)
        {
            _iconfiguration = iconfiguration;
            Con = _iconfiguration.GetSection("ConnectionStrings").GetSection("Connection").Value;
        }


        IContactMaster obj = new ContactMasterDAL();
        List<contactAddressDTO> lstcontactaddress { get; set; }
        List<EnterpriseTypeDTO> lstEnterprisetype { get; set; }
        List<BusinessTypeDTO> lstBusinessType { get; set; }


        [Route("api/loans/masters/contactmaster/Savecontact")]
        [HttpPost]
        public bool Savecontact([FromBody]ContactMasterDTO contact)
        {
            try
            {
              return  obj.Savecontact(contact,Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
        }
        [Route("api/loans/masters/contactmaster/ViewContact")]
        public ContactMasterDTO ViewContact(string refernceid)
        {
            try
            {
              return  obj.ViewContact(refernceid, Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
        }

        [Route("api/loans/masters/contactmaster/GetContactDetails")]
        public List<ContactMasterDTO> GetContactdetails()
        {
            try
            {
                return obj.GetContactdetails(Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }

        }
        [Route("api/loans/masters/contactmaster/UpdateContact")]
        public bool UpdateContact(ContactMasterDTO contact)
        {
            try
            {
              return  obj.UpdateContact(contact,Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
        }
        [Route("api/loans/masters/contactmaster/DeleteContact")]
        [HttpPost]
        public bool DeleteContact(ContactMasterDTO contact)
        {
            try
            {
              return  obj.DeleteContact(contact, Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
        }

        [Route("api/loans/masters/contactmaster/SaveAddressType")]
        [HttpPost]
        public bool SaveAddressType(contactAddressDTO _address)
        {
            try
            {
                return obj.SaveAddressType(_address,Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
        }

        [Route("api/loans/masters/contactmaster/GetAddressType")]

        public List<contactAddressDTO> GetAddressType()
        {
            lstcontactaddress = new List<contactAddressDTO>();
            try
            {
                lstcontactaddress = obj.GetAddressType(Con);

            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
            return lstcontactaddress;

        }


        [Route("api/loans/masters/contactmaster/SaveEnterpriseType")]
        [HttpPost]
        public bool SaveEnterpriseType(EnterpriseTypeDTO _Enterprise)
        {
            try
            {
                return obj.SaveEnterpriseType(_Enterprise,Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
        }


        [Route("api/loans/masters/contactmaster/GetEnterpriseType")]

        public List<EnterpriseTypeDTO> GetEnterpriseType()
        {
            lstEnterprisetype = new List<EnterpriseTypeDTO>();
            try
            {
                lstEnterprisetype = obj.GetEnterpriseType(Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
            return lstEnterprisetype;

        }



        [Route("api/loans/masters/contactmaster/SaveBusinessTypes")]
        [HttpPost]
        public bool SaveNatureofbusiness(BusinessTypeDTO _type)
        {
            try
            {
                return obj.SaveBusinessTypes(_type,Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
        }

        [Route("api/loans/masters/contactmaster/GetBusinessTypes")]
        public List<BusinessTypeDTO> GetBusinessTypes()
        {
            lstBusinessType = new List<BusinessTypeDTO>();
            try
            {
                lstBusinessType = obj.GetBusinessTypes(Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
            return lstBusinessType;

        }

        [Route("api/loans/masters/contactmaster/GetPersonCount")]
        [HttpPost]
        public int GetPersonCount(ContactMasterDTO ContactDto)
        {

            try
            {
                return obj.GetPersoncount(ContactDto,Con);
            }
            catch (Exception ex)
            {
                throw new FinstaAppException(ex.ToString());
            }
        }
    }
}