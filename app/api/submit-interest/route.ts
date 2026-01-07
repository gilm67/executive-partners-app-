import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate data (basic example)
    if (!data.email || !data.fullName || !data.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email notification to you
    const emailToYou = {
      to: 'careers@execpartners.ch',
      from: 'noreply@execpartners.ch',
      subject: `New Interest: ${data.fullName} - ${data.jobId || 'General'}`,
      html: `
        <h2>New Express Interest Submission</h2>
        <p><strong>Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Portable AUM:</strong> ${data.portableAUM}</p>
        <p><strong>Location Status:</strong> ${data.locationStatus}</p>
        <p><strong>Current Compensation:</strong> ${data.compensation}</p>
        <p><strong>Contact Method:</strong> ${data.contactMethod}</p>
        <p><strong>Job ID:</strong> ${data.jobId || 'General inquiry'}</p>
        <p><strong>Submitted:</strong> ${new Date().toISOString()}</p>
      `
    };

    // Send confirmation email to candidate
    const emailToCandidate = {
      to: data.email,
      from: 'careers@execpartners.ch',
      subject: 'Thank You for Your Interest - Executive Partners',
      html: `
        <h2>Thank You for Your Interest, ${data.fullName.split(' ')[0]}!</h2>
        
        <p>We've received your interest in ${data.jobId ? 'the ' + data.jobId + ' opportunity' : 'our opportunities'} and will respond within 24 hours via your preferred contact method: <strong>${data.contactMethod}</strong>.</p>

        <h3>What Happens Next:</h3>
        <ul>
          <li><strong>Within 24 hours:</strong> We'll review your profile and contact you</li>
          <li><strong>If strong fit:</strong> We'll schedule a 30-minute confidential phone call</li>
          <li><strong>During call:</strong> We'll discuss the opportunity in detail and reveal client identity</li>
          <li><strong>No obligation:</strong> You can decline at any point in the process</li>
        </ul>

        <h3>Your Submitted Information:</h3>
        <ul>
          <li>Portable AUM: ${data.portableAUM}</li>
          <li>Location Status: ${data.locationStatus}</li>
          <li>Current Compensation: ${data.compensation}</li>
          <li>Preferred Contact: ${data.contactMethod}</li>
        </ul>

        <p>We appreciate your time and look forward to speaking with you.</p>

        <p>Best regards,<br>
        <strong>Executive Partners</strong><br>
        +41 XX XXX XX XX<br>
        careers@execpartners.ch</p>

        <hr>
        <p style="font-size: 12px; color: #666;">
          This email was sent because you expressed interest in a private banking 
          opportunity via execpartners.ch. All information is kept strictly confidential 
          in accordance with GDPR.
        </p>
      `
    };

    // Send emails
    await Promise.all([
      sgMail.send(emailToYou),
      sgMail.send(emailToCandidate)
    ]);

    // Optional: Save to database
    // await saveToDatabase(data);

    return NextResponse.json({ 
      success: true,
      message: 'Interest submitted successfully'
    });

  } catch (error) {
    console.error('Error processing submission:', error);
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    );
  }
}