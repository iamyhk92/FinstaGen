using System;
using System.Collections.Generic;
using System.Text;

namespace FinstaInfrastructure.Loans.Masters
{
    public class LoansMasterDTO : CommonDTO
    {

        public List<instalmentdatedetails> instalmentdatedetailslist { get; set; }

        public List<loanconfigurationDTO> loanconfigurationlist { get; set; }

        public List<DocumentlistDto> identificationdocumentsList { get; set; }

       
        public Int64 pLoanid { get; set; }

        public int pLoantypeid { get; set; }
        public string pLoantype { get; set; }
        public string pLoanname { get; set; }
        public string pLoancode { get; set; }

        public string pCompanycode { get; set; }
        public string pBranchcode { get; set; }

        public string pSeries { get; set; }

        public int pSerieslength { get; set; }
        public string pLoanidcode { get; set; }

    }
    public class instalmentdatedetails : CommonDTO
    {
        public Int64 pLoantypeId { get; set; }
        public Int64 pLoanid { get; set; }
        public string pTypeofInstalmentDay { get; set; }
        public Int64 pDisbursefromday { get; set; }
        public Int64 pDisbursetoday { get; set; }
        public Int64 pInstalmentdueday { get; set; }
        public int ploantypeid { get; set; }
        public string ploantype { get; set; }

    }

    public class loanconfigurationDTO : CommonDTO
    {
        public Int64 pLoanconfigid { get; set; }
        public Int64 pLoantypeId { get; set; }
        public Int64 pLoanid { get; set; }
        public string pContacttype { get; set; }

        public string pApplicanttype { get; set; }
        public string pLoanpayin { get; set; }
        public decimal? pMinloanamount { get; set; }
        public decimal? pMaxloanamount { get; set; }
        public Int64 pTenurefrom { get; set; }
        public Int64 pTenureto { get; set; }
        public string pInteresttype { get; set; }
        public decimal? pRateofinterest { get; set; }
        public string ptypeofoperation { get; set; }

    }



    public class DocumentlistDto
    {
        public Int64 pLoantypeId { set; get; }

        public Int64 pLoanId { set; get; }

        public string pContactType { set; get; }

        public Int64 pDocumentId { set; get; }

        public Int64 pDocumentgroupId { set; get; }

        public Boolean pDocumentRequired { set; get; }

        public Boolean pDocumentMandatory { set; get; }
        
    }
}
