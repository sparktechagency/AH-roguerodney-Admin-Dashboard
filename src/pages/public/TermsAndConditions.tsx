import { useGetCmsQuery } from '../../redux/features/cms/cmsApi';

const ReadTermsAndConditions = () => {
    const { data } = useGetCmsQuery({ query: `?type=terms` });
    const content = data?.data?.content;

    return (
        <div className="max-w-screen-xl mx-auto py-16">
            <div dangerouslySetInnerHTML={{ __html: content || '' }}></div>
        </div>
    );
};

export default ReadTermsAndConditions;
