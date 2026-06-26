namespace Umbraco.Community.Sustainability.Helpers
{
    /// <summary>
    /// Helper class for calculating carbon ratings based on CO2 emissions.
    /// Thresholds mirror those defined in resource-checker.js.
    /// </summary>
    public static class CarbonRatingHelper
    {
        /// <summary>
        /// Calculates the carbon rating grade (A+ to F) based on CO2 per page view in grams.
        /// </summary>
        /// <param name="co2PerView">CO2 emissions per page view in grams</param>
        /// <returns>Grade from A+ (best) to F (worst)</returns>
        public static string CalculateGrade(double co2PerView)
        {
            if (co2PerView < 0.095) return "A+";
            if (co2PerView < 0.186) return "A";
            if (co2PerView < 0.341) return "B";
            if (co2PerView < 0.493) return "C";
            if (co2PerView < 0.656) return "D";
            if (co2PerView < 0.846) return "E";
            return "F";
        }
    }
}
