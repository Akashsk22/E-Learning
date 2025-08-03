import { User } from '../types';

interface CertificateData {
  userName: string;
  courseName: string;
  completionDate: string;
  courseDuration: string;
  certificateId: string;
  instructorName: string;
}

class CertificateService {
  // Generate certificate ID
  private generateCertificateId(): string {
    return `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  // Create certificate HTML content
  private createCertificateHTML(data: CertificateData): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Certificate of Completion</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
          
          body {
            margin: 0;
            padding: 40px;
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .certificate {
            background: white;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            padding: 60px;
            max-width: 800px;
            width: 100%;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .certificate::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: linear-gradient(90deg, #667eea, #764ba2);
          }
          
          .header {
            margin-bottom: 40px;
          }
          
          .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            color: white;
            font-size: 32px;
            font-weight: bold;
          }
          
          .title {
            font-size: 36px;
            font-weight: 700;
            color: #1f2937;
            margin-bottom: 10px;
          }
          
          .subtitle {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 40px;
          }
          
          .content {
            margin-bottom: 40px;
          }
          
          .award-text {
            font-size: 20px;
            color: #374151;
            margin-bottom: 30px;
            line-height: 1.6;
          }
          
          .student-name {
            font-size: 32px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 20px;
            padding: 20px;
            background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
            border-radius: 10px;
            border: 2px solid #d1d5db;
          }
          
          .course-info {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 30px;
          }
          
          .details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-bottom: 40px;
            text-align: left;
          }
          
          .detail-item {
            padding: 20px;
            background: #f9fafb;
            border-radius: 10px;
            border-left: 4px solid #667eea;
          }
          
          .detail-label {
            font-size: 14px;
            color: #6b7280;
            font-weight: 500;
            margin-bottom: 5px;
          }
          
          .detail-value {
            font-size: 16px;
            color: #1f2937;
            font-weight: 600;
          }
          
          .footer {
            margin-top: 40px;
            padding-top: 30px;
            border-top: 2px solid #e5e7eb;
          }
          
          .signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 40px;
            margin-bottom: 30px;
          }
          
          .signature {
            text-align: center;
          }
          
          .signature-line {
            width: 200px;
            height: 2px;
            background: #1f2937;
            margin: 20px auto 10px;
          }
          
          .signature-name {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 5px;
          }
          
          .signature-title {
            font-size: 14px;
            color: #6b7280;
          }
          
          .certificate-id {
            font-size: 12px;
            color: #9ca3af;
            margin-top: 20px;
          }
          
          @media print {
            body {
              background: white;
            }
            .certificate {
              box-shadow: none;
              border: 2px solid #1f2937;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <div class="logo">E</div>
            <h1 class="title">Certificate of Completion</h1>
            <p class="subtitle">This is to certify that</p>
          </div>
          
          <div class="content">
            <p class="award-text">
              has successfully completed the course requirements and demonstrated proficiency in the subject matter.
            </p>
            
            <div class="student-name">${data.userName}</div>
            
            <p class="course-info">
              Course: <strong>${data.courseName}</strong><br>
              Instructor: <strong>${data.instructorName}</strong>
            </p>
            
            <div class="details">
              <div class="detail-item">
                <div class="detail-label">Completion Date</div>
                <div class="detail-value">${data.completionDate}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">Course Duration</div>
                <div class="detail-value">${data.courseDuration}</div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <div class="signatures">
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-name">Course Instructor</div>
                <div class="signature-title">${data.instructorName}</div>
              </div>
              <div class="signature">
                <div class="signature-line"></div>
                <div class="signature-name">Platform Director</div>
                <div class="signature-title">E-Learning Platform</div>
              </div>
            </div>
            
            <div class="certificate-id">
              Certificate ID: ${data.certificateId}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  // Generate and download certificate
  async generateCertificate(
    user: User,
    courseName: string,
    instructorName: string,
    courseDuration: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const certificateData: CertificateData = {
        userName: user.name,
        courseName,
        completionDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        courseDuration,
        certificateId: this.generateCertificateId(),
        instructorName
      };

      const htmlContent = this.createCertificateHTML(certificateData);
      
      // Create blob and download
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificate-${courseName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      return { 
        success: true, 
        message: `Certificate for ${courseName} has been downloaded successfully!` 
      };
    } catch (error) {
      console.error('Certificate generation error:', error);
      return { 
        success: false, 
        message: 'Failed to generate certificate. Please try again.' 
      };
    }
  }

  // Check if course is completed
  isCourseCompleted(completedLessons: string[], totalLessons: number): boolean {
    return completedLessons.length >= totalLessons;
  }

  // Calculate course progress percentage
  calculateProgress(completedLessons: string[], totalLessons: number): number {
    if (totalLessons === 0) return 0;
    return Math.round((completedLessons.length / totalLessons) * 100);
  }
}

const certificateService = new CertificateService();
export default certificateService; 