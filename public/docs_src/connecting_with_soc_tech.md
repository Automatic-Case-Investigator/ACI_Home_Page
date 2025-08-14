# Connecting with SOC technologies

This is a tutorial of connecting SIEMs and SOARs to the main backend.

## Supported Platforms

**SOAR:** [The Hive](https://strangebee.com/)

**SIEM:** [Wazuh](https://wazuh.com/)

## Login to the server

The default username and password is (aci_admin: password).

![image](/assets/images/login.png)

## Setup Instructions

By clicking the gear icon at the top right, an interface for SIEM and SOAR configuration would be shown.

![image](/assets/images/settings.png)

## Setup Instructions -- SOAR

By clicking the "Add new" icon button in the SOAR information section, a popup prompting for SOAR information would be displayed.

![image](/assets/images/add_soar.png)

| **Field**  | **Description** |
|----------|-------------|
| Name | The name of the SOAR you wish to give |
| Type | The type of the SOAR (currently supports The Hive only) |
| URL  | The URL for accessing the SOAR API |
| API Key | The API key for accessing the SOAR |

After connecting to the SOAR, you can see security cases pop up in your organization!

![image](/assets/images/cases.png)

## Setup Instructions -- SIEM

By clicking the "Add new" icon button in the SIEM information section, a popup prompting for SIEM information would be displayed.

**Note: For Wazuh users, please use the OpenSearch URL and credentials for connection.**

![image](/assets/images/add_siem.png)

| **Field**  | **Description** |
|----------|-------------|
| Name | The name of the SIEM you wish to give |
| Type | The type of the SIEM (currently supports Wazuh only) |
| URL  | The URL for accessing the SIEM API |
| API Key | The API key for accessing the SIEM |
| Authentication Type | The authentication method (user/password or API key) |
| Username | The username for accessing the SIEM |
| Password | The password for accessing the SIEM |

**Note: For Wazuh users, please use the OpenSearch URL and credentials for connection.**