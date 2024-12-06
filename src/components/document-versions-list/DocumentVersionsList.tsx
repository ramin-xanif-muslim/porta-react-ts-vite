import { Drawer, Table } from 'antd';
import type { TableProps } from 'antd';
import { useGetDocumentsVersionsList } from '../../pages/document/use-get-documents-versions-list';
import dayjs from 'dayjs';
import { DocumentVersionDTO } from '../../types';
import { t } from 'i18next';
import { convertFileSize } from '../../lib/utils';
import ErrorBoundary from '../error-boundary/ErrorBoundary';

interface DocumentVersionsListProps {
  documentId: string;
  folderId: string;
  open: boolean;
  onClose: () => void;
}

const DocumentVersionsList = ({ documentId, folderId, open, onClose }: DocumentVersionsListProps) => {
  const { data, error, isFetching } = useGetDocumentsVersionsList({ documentId, folderId, open });

  if (error) {
    return (
      <ErrorBoundary>
        <Drawer
          title={t('Document Versions')}
          placement="right"
          onClose={onClose}
          open={open}
          width={600}
        >
          <div>{t('Error loading document versions')}</div>
        </Drawer>
      </ErrorBoundary>
    );
  }

  const columns: TableProps<DocumentVersionDTO>['columns'] = [
    {
      title: t('File Extension'),
      dataIndex: 'fileExtension',
      key: 'fileExtension',
    },
    {
      title: t('File Name'),
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: t('Size'),
      dataIndex: 'fileSize',
      key: 'fileSize',
      render: (value) => convertFileSize(value),
    },
    {
      title: t('Created On'),
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (value) => dayjs(value).format('DD/MM/YYYY HH:mm'),
    },
  ];

  return (
    <ErrorBoundary>
      <Drawer
        title={t('Document Versions')}
        placement="right"
        onClose={onClose}
        open={open}
        width={900}
      >
        <Table<DocumentVersionDTO>
          columns={columns}
          dataSource={data?.data.list || []}
          loading={isFetching}
          pagination={false}
          size="small"
        />
      </Drawer>
    </ErrorBoundary>
  );
};

export default DocumentVersionsList; 