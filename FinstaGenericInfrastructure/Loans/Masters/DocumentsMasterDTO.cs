using System;
using System.Collections.Generic;
using System.Text;

namespace FinstaInfrastructure.Loans.Masters
{
    public class DocumentsMasterDTO: CommonDTO
    {
        public List<pIdentificationDocumentsDTO>pDocumentsList { get; set; }
        public string pDocumentGroup { get; set; }
        public string pDocumentName { get; set; }
        public long pDocumentGroupId { set; get; }
       // public bool pMandatory { set; get; }
       // public bool pRequired { set; get; }
       
    }
    public class pIdentificationDocumentsDTO
    {
        public string pContactType { get; set; }
        public long pDocumentId { get; set;}
        public string pDocumentName { get; set; }
        public long pDocumentgroupId { set; get; }
        public bool pDocumentMandatory { set; get; }
        public bool pDocumentRequired { set; get; }

        public long pLoantypeId { set; get; }

    }

    public class LoanIdDTO
    {
        public long pLoanId { set; get; }
    }

}
