using System;
using System.Collections.Generic;
using System.Text;

namespace FinstaInfrastructure.Loans.Masters
{
   public  class ChargesMasterDTO:CommonDTO
    {
        public string pCHARGENAME { get; set; }      
        public string pLOANPAYIN { get; set; }
        public int pTENUREFROM { get; set; }
        public int pTENURETO { get; set; }
        public string pISCHARGEAPPLICABLE { get; set; }
        public string pISTAXAPPLICABLE { get; set; }
        public string pISCHARGERANGEAPPLICABLEON { get; set; }
        public string pCHARGECALTYPE { get; set; }
        public string pCHARGECALONFIELD { get; set; }
        public int pCHARGESVALUE { get; set; }
        public string pTAXTYPE { get; set; }
        public int pTAXVALUE { get; set; }
        public int pMINLOANAMOUNT { get; set; }
        public int pMAXLOANAMOUNT { get; set; }
        public int pMINCHARGEAMOUNTOFPERCENTAGE { get; set; }
        public int pMAXCHARGEAMOUNTOFPERCENTAGE { get; set; }
        public DateTime pEFFECTFROMDATE { get; set; }
        public DateTime pEFFECTTODATE { get; set; }
        public string pISCHARGEWAIVEDOFF { get; set; }
        public int pLOCKINGPERIOD { get; set; }
        public List<Loanchargetypes> pLoanchargetypes { get; set; }
        public int pLOANTYPEID { get; set; }
        public int pLOANID { get; set; }
        public int pCHARGEID { get; set; }
        public int pLOANCHARGEID { get; set; }
        public string pLEDGERNAME { get; set; }
        public string pPARENTGROUPLEDGERNAME { get; set; }
        public string pPARENTGROUPLEDGERID { get; set; }

    }
    public class Loanchargetypes
    {
        public string pCHARGENAME { get; set; }
        public int pLOANTYPEID { get; set; }
        public int pLOANID { get; set; }
        public int pCHARGEID { get; set; }
        public int pLOANCHARGEID { get; set; }
        public string pLEDGERNAME { get; set; }
        public string pPARENTGROUPLEDGERNAME { get; set; }
        public string pPARENTGROUPLEDGERID { get; set; }

    }
}
