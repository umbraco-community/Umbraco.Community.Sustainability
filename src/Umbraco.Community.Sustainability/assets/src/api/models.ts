

export enum EventMessageTypeModel {
    DEFAULT = 'Default',
    INFO = 'Info',
    ERROR = 'Error',
    SUCCESS = 'Success',
    WARNING = 'Warning'
}

export type ExternalResource = {
        url?: string | null
size: number
    };

export type ExternalResourceGroup = {
        type: ResourceGroupType
name?: string | null
totalSize: number
resources?: Array<ExternalResource> | null
    };

export type NotificationHeaderModel = {
        message: string
category: string
type: EventMessageTypeModel
    };

export enum ResourceGroupType {
    IMAGES = 'Images',
    SCRIPTS = 'Scripts',
    STYLES = 'Styles',
    OTHER = 'Other'
}

export type SustainabilityResponse = {
        lastRunDate: string
totalSize: number
totalEmissions: number
carbonRating?: string | null
resourceGroups?: Array<ExternalResourceGroup> | null
    };

export type SustainabilityData = {
        
        payloads: {
            CheckPage: {
                        pageGuid?: string
                        
                    };
GetPageData: {
                        pageGuid?: string
                        
                    };
SavePageData: {
                        pageGuid?: string
requestBody?: SustainabilityResponse
                        
                    };
        }
        
        
        responses: {
            CheckPage: SustainabilityResponse
                ,GetPageData: SustainabilityResponse
                ,SavePageData: boolean
                
        }
        
    }