using FinstaInfrastructure.Loans.Masters;
using System;
using System.Collections.Generic;
using System.Text;


namespace FinstaRepository.Interfaces.Loans.Masters
{
    public interface IContactMaster
    {
        // bool Saveaddresstype(string addressname);
        #region SaveContact
        bool Savecontact(ContactMasterDTO contact,string ConnectionString);
        #endregion

        #region ViewContact
        ContactMasterDTO ViewContact(string referenceid,string ConnectionString);
        #endregion

        #region GetContactdetails
        List<ContactMasterDTO> GetContactdetails(string ConnectionString);
        #endregion

        #region UpdateContact
        bool UpdateContact(ContactMasterDTO contact,string ConnectionString);
        #endregion

        #region DeleteContact
        bool DeleteContact(ContactMasterDTO contact, string ConnectionString);
        #endregion

        #region ContactAddressTypes       
        bool SaveAddressType(contactAddressDTO addressname,string ConnectionString);

        List<contactAddressDTO> GetAddressType(string ConnectionString);
        #endregion

        #region ContactEnterpriseTypes     
        bool SaveEnterpriseType(EnterpriseTypeDTO Enterprisetype,string ConnectionString);

        List<EnterpriseTypeDTO> GetEnterpriseType(string ConnectionString);
        #endregion

        #region ContactEnterpriseTypes     
        bool SaveBusinessTypes(BusinessTypeDTO BusinessTypes,string ConnectionString);

        List<BusinessTypeDTO> GetBusinessTypes(string ConnectionString);
        #endregion
        #region Personcount
        int GetPersoncount(ContactMasterDTO ContactDto, string ConnectionString);
        #endregion

    }

}
