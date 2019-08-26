using FinstaInfrastructure.Settings;
using System;
using System.Collections.Generic;
using System.Text;

namespace FinstaRepository.Interfaces.Settings
{
    public interface ISettings
    {

        List<SettingsDTO> getContacttitles(string ConnectionString);
        List<SettingsDTO> getCountries(string ConnectionString);

        List<SettingsDTO> getStates(string ConnectionString, int id);

        List<SettingsDTO> getDistricts(string ConnectionString, int id);
        List<SettingsDTO> getCompanyandbranchdetails(string ConnectionString);
        List<SettingsDTO> getApplicanttypes(string contacttype, string con);
    }
}
