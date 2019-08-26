using System;
using System.Collections.Generic;
using System.Text;
using FinstaInfrastructure.Loans.Masters;

namespace FinstaRepository.Interfaces.Loans.Masters
{
   public interface IDocumentsMaster
    {
        bool SaveDocumentGroup(DocumentsMasterDTO Documents,string ConnectionString);
        bool SaveIdentificationDocuments(DocumentsMasterDTO Documents, string ConnectionString);    
        List<DocumentsMasterDTO> Getdocumentidprofftypes(string ConnectionString, LoanIdDTO Documents);

        List<DocumentsMasterDTO> GetDocumentGroupNames(string ConnectionString);

    }
}
